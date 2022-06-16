import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { StatusOnOff } from "src/models/common.type";
import { Constant } from "src/utils/constant";

const { ObjectId } = MongooseSchema.Types;

@Schema({ timestamps: true })
export class TopicModel {
  @Prop({ required: true })
  name: string;

  @Prop({ type: ObjectId, ref: Constant.schema.USER, required: true })
  owner: string;

  @Prop({ type: Number, enum: StatusOnOff, default: StatusOnOff.ON })
  status: StatusOnOff;
}

export type TopicDocument = TopicModel & Document;

export const TopicSchema = SchemaFactory.createForClass(TopicModel);
