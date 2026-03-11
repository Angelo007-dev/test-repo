export const ECampaignStatus = {
    ACTIVE: 'active',
    PAUSED: 'paused',
    ENDED: 'ended',
} as const;

export type TCampaignStatus = typeof ECampaignStatus[keyof typeof ECampaignStatus];