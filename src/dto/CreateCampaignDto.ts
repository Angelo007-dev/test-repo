import { ECampaignStatus } from "src/constant/constant";
import { IsString, IsNumber, IsDateString, IsArray, IsEnum, IsOptional, Min, IsInt } from 'class-validator';
import { IsAfterDate } from "src/common/utils/utils";

export class CreateCampaignDto {
    @IsString()
    name: string;

    @IsString()
    advertiser: string;

    @IsDateString()
    startDate: Date;

    @IsAfterDate('startDate', { message: 'endDate must be after startDate' })
    @IsDateString()
    endDate: Date;

    @IsNumber()
    @Min(0, { message: "budget can't be negative" })
    budget: number;

    @IsOptional()
    @IsNumber()
    impressionServed?: number;

    @IsArray()
    @IsString({ each: true })
    targetCountries: string[];

    @IsEnum(ECampaignStatus)
    @IsOptional()
    status?: ECampaignStatus
}