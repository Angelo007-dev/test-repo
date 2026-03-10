import type { TCampaignStatus } from "../constants/constants";

export interface IDataRes<T> {
    success: boolean;
    data: T;
    timestamp: string;
}

export interface ICreateInput {
    name: string;
    advertiser: string;
    startDate: Date;
    endDate: Date;
    budget: number;
    impressionServed?: number;
    targetCountries: string[];
    status: TCampaignStatus;
}

export interface ICampaign {
    _id: number
    name: string;
    advertiser: string;
    startDate: Date;
    endDate: Date;
    budget: number;
    impressionServed?: number;
    targetCountries: string[];
    status: TCampaignStatus;
}

export interface IDataResponse<T> {
    data: T;
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface IDashboard {
    _id: number;
    totalCampaigns: number;
    activeCampaigns: number;
    totalImpressions: number;
    topAdvertiser: number
}