import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { StatusOnOff } from "src/models/common.type";
import { Constant } from "src/utils/constant";

const { ObjectId } = MongooseSchema.Types;

@Schema({ timestamps: true })
export class MissionModel {
  @Prop({ required: true })
  name: string;

  @Prop([{ type: ObjectId, ref: Constant.schema.MISSION }])
  mission: [];

  @Prop({ type: ObjectId, ref: Constant.schema.USER, required: true })
  owner: string;

  @Prop({ type: Number, required: true })
  point: number;

  @Prop([{ type: Number, enum: StatusOnOff, default: StatusOnOff.ON }])
  status: StatusOnOff;
}

export type MissionDocument = MissionModel & Document;

export const MissionSchema = SchemaFactory.createForClass(MissionModel);
