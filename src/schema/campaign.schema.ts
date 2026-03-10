import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ECampaignStatus } from "src/constant/constant";

export type CampaignDocument = Campaign & Document
@Schema()
export class Campaign {
    @Prop()
    name: string;

    @Prop()
    advertiser: string;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop({ required: true })
    budget: number;

    @Prop({ default: 0 })
    impressionServed: number;

    @Prop({ type: [String] })
    targetCountries: string[];

    @Prop({
        type: String,
        enum: ECampaignStatus,
        default: ECampaignStatus.ACTIVE
    })
    status: ECampaignStatus
}
export const CampaignSchema = SchemaFactory.createForClass(Campaign);

CampaignSchema.post('findOneAndUpdate', async function (doc) {
    if (doc && doc.impressionServed >= doc.budget && doc.status !== ECampaignStatus.ENDED) {
        doc.status = ECampaignStatus.ENDED;
        await doc.save();
    }
});