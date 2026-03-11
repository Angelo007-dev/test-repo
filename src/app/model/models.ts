import type { TCampaignStatus } from "../constants/constants";
import { z } from "zod";
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

export interface ICampaignRes {
    _id: number
    name: string;
    advertiser: string;
    startDate: Date;
    endDate: Date;
    budget: number;
    impressionServed?: number;
    targetCountries: string[];
    status: TCampaignStatus;
    __v: number
}
export interface IDataResponse<T> {
    success: boolean;
    data: {
        data: Array<T>;
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }
    timestamp: string;
}

export interface IDashboard {
    _id: number;
    totalCampaigns: number;
    activeCampaigns: number;
    totalImpressions: number;
    topAdvertiser: number
}



export const campaignSchema = z.object({
    name: z.string().min(3, "Le nom est obligatoire"),
    advertiser: z.string().min(2, "Advertiser requis"),
    budget: z.number().positive("Budget invalide"),
    impressionServed: z.number().int().nonnegative(),
    targetCountries: z.string().min(2, "Pays requis"),
    startDate: z.string(),
    endDate: z.string(),
    status: z.enum(["active", "paused", "ended"])
});

export type CampaignForm = z.infer<typeof campaignSchema>;