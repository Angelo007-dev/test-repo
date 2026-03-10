import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { stat } from 'fs';
import { Model } from 'mongoose';
import { ECampaignStatus } from 'src/constant/constant';
import { CreateCampaignDto } from 'src/dto/CreateCampaignDto';
import { QueryParamsDto } from 'src/dto/QueryParamsDto';
import { Campaign, CampaignDocument } from 'src/schema/campaign.schema';

@Injectable()
export class CampaignService {
    constructor(
        @InjectModel(Campaign.name)
        private readonly campaignModel: Model<CampaignDocument>
    ) { }
    async createCampaign(dto: CreateCampaignDto) {
        const campaign_data = {
            ...dto,
            startDate: new Date(dto.startDate),
            endDate: new Date(dto.endDate),
        };

        const new_campaign = new this.campaignModel(campaign_data);

        return await new_campaign.save();
    }

    async campaignList(query: QueryParamsDto) {
        const { page, limit, advertiser, country, status } = query;
        const filter: any = {};
        if (status) filter.status = status;
        if (advertiser) filter.advertiser = { $regex: advertiser, $options: 'i' }
        if (country) filter.targetCountries = country;

        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.campaignModel
                .find(filter)
                .skip(skip)
                .limit(limit)
                .exec(),
            this.campaignModel
                .countDocuments(filter)
                .exec(),
        ]);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        }
    }
    async servedAd(country: string) {
        const now = new Date();

        const campaign = await this.campaignModel.findOneAndUpdate(
            {
                status: ECampaignStatus.ACTIVE,
                targetCountries: country,
                startDate: { $lte: now },
                endDate: { $gte: now },
                $expr: { $lt: ["$impressionServed", "$budget"] }
            },
            { $inc: { impressionServed: 1 } },
            { new: true }
        );
        if (!campaign) throw new NotFoundException('No Campaign active');

        return campaign
    }


    /***STATS*****/
    async getStats() {
        const stats = await this.campaignModel.aggregate([
            {
                $facet: {
                    "totals": [
                        {
                            $group: {
                                _id: null,
                                totalCampaigns: { $sum: 1 },
                                activeCampaigns: {
                                    $sum: { $cond: [{ $eq: ["$status", ECampaignStatus.ACTIVE] }, 1, 0] }
                                },
                                totalImpressions: { $sum: "$impressionServed" }
                            }
                        }
                    ],
                    "topAdvertiser": [
                        { $group: { _id: "$advertiser", total: { $sum: "$impressionServed" } } },
                        { $sort: { total: - 1 } },
                        { $limit: 1 }
                    ]
                }
            }
        ]);

        const result = stats[0];
        const totalData = result.totals[0] || { totalCompaigns: 0, activeCompaigns: 0, totalImpressions: 0 };

        return {
            ...totalData,
            topAdvertiser: result.topAdvertiser.length > 0 ? result.topAdvertiser[0]._id : null
        }
    }
}
