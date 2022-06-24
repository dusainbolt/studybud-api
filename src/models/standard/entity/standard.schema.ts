import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { PointStandard, StatusOnOff } from "src/models/models.enum";
import { Constant } from "src/utils/constant";

const { ObjectId } = MongooseSchema.Types;

@Schema({ timestamps: true })
export class StandardModel {
  @Prop({ required: true })
  name: string;

  @Prop({ type: ObjectId, ref: Constant.schema.MISSION })
  mission: string;

  @Prop({ type: ObjectId, ref: Constant.schema.USER, required: true })
  owner: string;

  @Prop({ type: Number })
  point: number;

  @Prop([{ type: String }])
  pointData: number;

  @Prop({ type: Number, enum: PointStandard, default: PointStandard.INPUT })
  pointType: PointStandard;

  @Prop({ type: Number, enum: StatusOnOff, default: StatusOnOff.ON })
  status: StatusOnOff;
}

export type StandardDocument = StandardModel & Document;

export const StandardSchema = SchemaFactory.createForClass(StandardModel);
