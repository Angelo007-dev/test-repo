import React from 'react'
import { useCreate } from '../hooks/useApi'
import { useForm } from 'react-hook-form';
import { campaignSchema, type CampaignForm } from '../model/models';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Create() {
    const { mutate } = useCreate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CampaignForm>({
        resolver: zodResolver(campaignSchema)
    });
    const onSubmit = (data: CampaignForm) => {
        mutate({
            ...data,
            targetCountries: data.targetCountries.split(","),
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
        });
    }

    return (

        <div className="max-w-xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">Créer une campagne</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <input
                    {...register("name")}
                    placeholder="Nom"
                    className="w-full border p-2 rounded"
                />
                <p className="text-red-500">{errors.name?.message}</p>

                <input
                    {...register("advertiser")}
                    placeholder="Advertiser"
                    className="w-full border p-2 rounded"
                />
                <p className="text-red-500">{errors.advertiser?.message}</p>

                <input
                    type="number"
                    {...register("budget", { valueAsNumber: true })}
                    placeholder="Budget"
                    className="w-full border p-2 rounded"
                />

                <input
                    type="number"
                    {...register("impressionServed", { valueAsNumber: true })}
                    placeholder="Impressions"
                    className="w-full border p-2 rounded"
                />

                <input
                    {...register("targetCountries")}
                    placeholder="Pays (France,Belgique)"
                    className="w-full border p-2 rounded"
                />

                <input
                    type="date"
                    {...register("startDate")}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="date"
                    {...register("endDate")}
                    className="w-full border p-2 rounded"
                />

                <select
                    {...register("status")}
                    className="w-full border p-2 rounded"
                >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="ended">Ended</option>
                </select>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Créer
                </button>

            </form>

        </div>
    );
}
