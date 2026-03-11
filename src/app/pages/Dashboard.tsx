import { useDashboard } from "../hooks/useApi";


export default function Dashboard() {

    const { data, isLoading, isError } = useDashboard();

    if (isLoading) {
        return <div className="p-6">Chargement...</div>;
    }

    if (isError) {
        return <div className="p-6 text-red-500">Erreur de chargement</div>;
    }

    const dashboard = data?.data;

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                {/* Total campagnes */}
                <div className="bg-white shadow rounded-xl p-6">
                    <p className="text-gray-500">Total </p>
                    <h2 className="text-3xl font-bold">
                        {dashboard?.totalCampaigns}
                    </h2>
                </div>

                {/* Campagnes actives */}
                <div className="bg-white shadow rounded-xl p-6">
                    <p className="text-gray-500">Actif </p>
                    <h2 className="text-3xl font-bold text-green-600">
                        {dashboard?.activeCampaigns}
                    </h2>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <p className="text-gray-500">Total Impressions</p>
                    <h2 className="text-3xl font-bold text-blue-600">
                        {dashboard?.totalImpressions?.toLocaleString()}
                    </h2>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <p className="text-gray-500">Top Annonce</p>
                    <h2 className="text-2xl font-bold text-purple-600">
                        {dashboard?.topAdvertiser}
                    </h2>
                </div>

            </div>

        </div>
    );
} 
