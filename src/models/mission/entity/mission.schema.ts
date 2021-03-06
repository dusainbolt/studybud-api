import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { StatusOnOff } from "src/models/models.enum";
import { Constant } from "src/utils/constant";

const { ObjectId } = MongooseSchema.Types;

@Schema({ timestamps: true })
export class MissionModel {
  @Prop({ required: true })
  name: string;

  @Prop({ type: ObjectId, ref: Constant.schema.TOPIC })
  topic: string;

  @Prop([{ type: ObjectId, ref: Constant.schema.STANDARD }])
  standards: string[];

  @Prop({ type: ObjectId, ref: Constant.schema.USER, required: true })
  owner: string;

  @Prop({ type: Number, enum: StatusOnOff, default: StatusOnOff.ON })
  status: StatusOnOff;
}

export type MissionDocument = MissionModel & Document;

export const MissionSchema = SchemaFactory.createForClass(MissionModel);
