import { useMutation, useQuery } from "@tanstack/react-query"
import type { ICreateInput, ICampaign, IDataRes } from "../model/models"
import { api, EEndpoint, type QueryParamsOptions } from "../service/campaignApi"
import { notify } from "../utils/notify"
import { queryClient } from "../queryClient"

export const useCreate = () => {
    return useMutation<IDataRes<ICampaign>, Error, ICreateInput>({
        mutationKey: [EEndpoint.CREATE],
        mutationFn: (payload) => api.createCampaign(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [EEndpoint.LIST] });
            notify.success('Campagne créer avec succèes');
        },
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