import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { JWT } from "./jwt.entity";
import { Gender, Role, SocialType, UserStatus } from "src/models/models.enum";

@Schema({ timestamps: true })
export class UserModel {
  @Prop({ default: null })
  email: string;

  @Prop({ unique: true })
  username: string;

  @Prop({ default: null })
  name: string;

  @Prop({ default: null })
  firstName: string;

  @Prop({ default: null })
  lastName: string;

  @Prop({ default: null })
  avatar: string;

  @Prop({ default: null })
  description: string;

  @Prop({ default: null })
  school: string;

  @Prop({ default: null })
  address: string;

  @Prop({ default: null })
  phone: string;

  @Prop({ default: null })
  password: string;

  @Prop({ default: null })
  contact: string;

  @Prop({ type: Number, enum: SocialType, default: SocialType.SYSTEM })
  socialType: SocialType;

  @Prop({ default: null })
  socialId: string;

  @Prop({ type: Number, enum: Gender, default: Gender.FEMALE })
  gender: Gender;

  @Prop({ type: Date, default: null })
  birthday: Date;

  @Prop([
    {
      value: {
        type: String,
      },
      exp: { type: Date },
      createdAt: { type: Date },
    },
  ])
  tokens: JWT[];

  @Prop([{ type: Number, enum: Role }])
  roles: [Role];

  @Prop({ type: Number, enum: UserStatus, default: UserStatus.INACTIVE })
  status: UserStatus;
}

export type UserDocument = UserModel & Document;

export const UserSchema = SchemaFactory.createForClass(UserModel);
