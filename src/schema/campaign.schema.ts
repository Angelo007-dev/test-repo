import { Prop, Schema } from "@nestjs/mongoose";
import { ECampaignStatus } from "src/constant/constant";

export type CampaignDocument = Campaign & Document
@Schema()
export class Campaign {
    @Prop()
    name: string;

    @Prop()
    advertiser: string;

    @Prop()
    startDates: Date;

    @Prop()
    endDate: Date;

    @Prop()
    budget: number;

    @Prop()
    impressionServed: number;

    @Prop({ type: [String] })
    targetCountries: string[];

    @Prop({
        type: 'enum',
        enum: ECampaignStatus,
        default: ECampaignStatus.ACTIVE
    })
    status: ECampaignStatus
}