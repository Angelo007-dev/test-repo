import { useMutation, useQuery } from "@tanstack/react-query"
import type { ICreateInput, ICampaign, IDataRes } from "../model/models"
import { api, EEndpoint, type QueryParamsOptions } from "../service/campaignApi"
import { notify } from "../utils/notify"

export const useApi = () => {
    return useMutation<IDataRes<ICampaign>, Error, ICreateInput>({
        mutationKey: [EEndpoint.CREATE],
        mutationFn: (payload) => api.createCampaign(payload),
        onSuccess: () => notify.success('Campagne créer avec succèes'),
        onError: (e) => notify.error(e.message)
    });
}
export const useList = (query: QueryParamsOptions) => {
    return useQuery({
        queryKey: [EEndpoint.LIST, query],
        queryFn: () => api.campaignList(query),
        placeholderData: (previousData) => previousData,
    });
};
export const useDashboard = () => {
    return useQuery({
        queryKey: [EEndpoint.DASHBOARD],
        queryFn: () => api.dashboard(),
        placeholderData: (previousData) => previousData,
    });
};