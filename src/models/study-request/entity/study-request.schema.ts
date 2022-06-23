import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { StatusOnOff } from "src/models/models.enum";
import { Constant } from "src/utils/constant";

const { ObjectId } = MongooseSchema.Types;

@Schema({ timestamps: true })
export class StudyRequestModel {
  @Prop({ required: true })
  title: string;

  @Prop({ type: ObjectId, ref: Constant.schema.TOPIC })
  topic: string;

  @Prop({ type: ObjectId, ref: Constant.schema.MISSION })
  mission: string;

  @Prop({ type: ObjectId, ref: Constant.schema.STANDARD })
  standard: string;

  @Prop({ type: ObjectId, ref: Constant.schema.USER, required: true })
  owner: string;

  @Prop({ default: null })
  point: number;

  @Prop({ default: null })
  pointValue: string;

  @Prop({ default: null })
  requestDes: string;

  @Prop({ default: null })
  missionDes: string;

  @Prop({ type: Number, enum: StatusOnOff, default: StatusOnOff.ON })
  status: StatusOnOff;
}

export type StudyRequestDocument = StudyRequestModel & Document;

export const StudyRequestSchema =
  SchemaFactory.createForClass(StudyRequestModel);
