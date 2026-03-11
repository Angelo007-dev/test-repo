import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from 'src/dto/CreateCampaignDto';
import { QueryParamsDto } from 'src/dto/QueryParamsDto';

@Controller('campaign')
export class CampaignController {
    constructor(
        private readonly campaignService: CampaignService,
    ) { }

    @Post('create-campaign')
    campaignCreate(@Body() dto: CreateCampaignDto) {
        return this.campaignService.createCampaign(dto);
    }

    @Get('list-campaign')
    campaignList(@Query() query: QueryParamsDto) {
        return this.campaignService.campaignList(query);
    }

    @Post('served-ad')
    servedAd(@Body() body: { country: string }) {
        return this.campaignService.servedAd(body.country);
    }

    /****data provider ****/
    @Get('stats')
    getStats() {
        return this.campaignService.getStats();
    }
}
