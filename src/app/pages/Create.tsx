import { useCreate } from '../hooks/useApi'
import { useForm } from 'react-hook-form';
import { campaignSchema, type CampaignForm } from '../model/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { LINKS } from '../constants/menu';
import CustomInput from '../components/input/CustomInput';

export default function Create() {
    const { mutate } = useCreate();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<CampaignForm>({
        resolver: zodResolver(campaignSchema),
        defaultValues: {
            name: "",
            advertiser: "",
            budget: 0,
            impressionServed: 0,
            targetCountries: "",
            startDate: "",
            endDate: "",
            status: "active",
        },
    });
    const onSubmit = (data: CampaignForm) => {
        mutate({
            ...data,
            targetCountries: data.targetCountries.split(","),
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
        },
            {
                onSuccess: () => {
                    navigate(LINKS.LIST);
                }
            }
        );
    }

    return (

        <div className="max-w-xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">Créer une campagne</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <CustomInput
                    label='Nom'
                    placeholder="ex: Black Friday"
                    {...register("name")}
                    className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                <CustomInput
                    label='Annonceur'
                    placeholder="ex: Marque X, Addidas"
                    {...register("advertiser")}
                    className={errors.advertiser ? "border-red-500" : ""}
                />
                {errors.advertiser && <p className="text-red-500 text-sm">{errors.advertiser.message}</p>}

                <CustomInput
                    label='Budget'
                    type="number"
                    {...register("budget", { valueAsNumber: true })}
                    placeholder="Budget"
                    className={errors.budget ? "border-red-500" : ""}
                />
                {errors.budget && <p className="text-red-500 text-sm">{errors.budget.message}</p>}

                <CustomInput
                    label='Impression'
                    type="number"
                    {...register("impressionServed", { valueAsNumber: true })}
                    placeholder="Impressions"
                    className={errors.impressionServed ? "border-red-500" : ""}
                />
                {errors.impressionServed && <p className="text-red-500 text-sm">{errors.impressionServed.message}</p>}

                <CustomInput
                    label='Pays'
                    {...register("targetCountries")}
                    placeholder="Pays (France,Belgique)"
                    className={errors.targetCountries ? "border-red-500" : ""}
                />
                {errors.targetCountries && <p className="text-red-500 text-sm">{errors.targetCountries.message}</p>}

                <CustomInput
                    label='Date de début'
                    type="date"
                    {...register("startDate")}
                    className={errors.startDate ? "border-red-500" : ""}
                />
                {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}


                <CustomInput
                    label='Date de fin'
                    type="date"
                    {...register("endDate")}
                    className={errors.endDate ? "border-red-500" : ""}
                />
                {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}

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
