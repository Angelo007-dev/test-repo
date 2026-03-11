import { useState } from 'react'
import type { TCampaignStatus } from '../constants/constants';
import type { QueryParamsOptions } from '../service/campaignApi';
import { useList } from '../hooks/useApi';

export default function List() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [filters, setFilters] = useState({
        advertiser: '',
        country: '',
        status: '' as TCampaignStatus | '',
    });
    const query: QueryParamsOptions = {
        page,
        limit,
        advertiser: filters.advertiser,
        country: filters.country,
        status: filters.status || undefined,
    };
    const { data, isPending, isError } = useList(query);
    if (isPending) return <div className='p-4'>Chargement...</div>
    if (isError) return <div className='p-4 text-red-500'>Erreur lors du chargement</div>

    //pagination
    const totalPages = data?.data?.meta?.totalPages || 1;

    return (
        <div className='p-4'>
            <div className='flex gap-2 mb-4'>
                <input
                    type='text'
                    placeholder='Advertiser'
                    value={filters.advertiser}
                    onChange={(e) => setFilters({ ...filters, advertiser: e.target.value })}
                    className="border p-2 rounded flex-1"
                />
                <input
                    type='text'
                    placeholder='Country'
                    value={filters.country}
                    onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                    className="border p-2 rounded flex-1"
                />
                <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value as TCampaignStatus })}
                    className='border p-2 rounded'
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="ended">Ended</option>
                </select>
                <select
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="border p-2 rounded"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>
            <table className='min-w-full border border-gray-200'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='p-2 border'>Name</th>
                        <th className='p-2 border'>Advertiser</th>
                        <th className='p-2 border'>Budget</th>
                        <th className='p-2 border'>Impressions</th>
                        <th className='p-2 border'>Countries</th>
                        <th className='p-2 border'>Status</th>
                        <th className='p-2 border'>Start</th>
                        <th className='p-2 border'>End</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data.data.map((campaign: any) => (
                        <tr key={campaign._id} className='hover:bg-gray-50'>
                            <td className='p-2 border'>{campaign.name}</td>
                            <td className='p-2 border'>{campaign.advertiser}</td>
                            <td className='p-2 border'>{campaign.budget}</td>
                            <td className='p-2 border'>{campaign.impressionServed}</td>
                            <td className='p-2 border'>{campaign.targetCountries.join(', ')}</td>
                            <td className='p-2 border'>{campaign.status}</td>
                            <td className="p-2 border">
                                {campaign.startDate ? new Date(campaign.startDate).toLocaleDateString() : '-'}
                            </td>
                            <td className="p-2 border">
                                {campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-between items-center mt-4'>
                <button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className='px-3 py-1 border rounded disabled:opacity-50'
                >
                    Précedent
                </button>
                <span>
                    Page {page}/{totalPages}
                </span>
                <button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    className='px-3 py-1 border rounded disabled:opacity-50'
                >
                    Suivant
                </button>
            </div>
        </div>
    )
}
