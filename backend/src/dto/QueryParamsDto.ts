import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { ECampaignStatus } from "src/constant/constant";

export class QueryParamsDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    page: number = 1;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10000)
    @Type(() => Number)
    limit: number = 10;

    @IsOptional()
    @IsEnum(ECampaignStatus)
    status?: ECampaignStatus;

    @IsOptional()
    @IsString()
    advertiser?: string;

    @IsOptional()
    @IsString()
    country?: string;
}