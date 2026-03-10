import type { TCampaignStatus } from "../constants/constants";
import type { ICampaign, ICreateInput, IDashboard, IDataRes, IDataResponse } from "../model/models";
import apiClient from "./campaoignService"
export const EEndpoint = {
    CREATE: "create-campaign",
    LIST: "list-campaign",
    DASHBOARD: "stats",
} as const;
export interface QueryParamsOptions {
    page: number;
    limit: number;
    status?: TCampaignStatus;
    advertiser?: string;
    country?: string;
}
export const api = {
    createCampaign: async (payload: ICreateInput) => {
        try {
            const { data } = await apiClient.post<IDataRes<ICampaign>>(
                EEndpoint.CREATE, payload
            );
            return data;
        } catch (err: any) {
            throw new Error(err);
        }
    },
    campaignList: async (query: QueryParamsOptions) => {
        try {
            const { data } = await apiClient.get<IDataResponse<ICampaign[]>>(
                EEndpoint.LIST,
                { params: query }
            );
            return data;
        } catch (err: any) {
            throw new Error(err);
        }
    },
    dashboard: async () => {
        try {
            const { data } = await apiClient.get<IDataRes<IDashboard>>(
                EEndpoint.DASHBOARD,
            );
            return data;
        } catch (err: any) {
            throw new Error(err);
        }
    },
}