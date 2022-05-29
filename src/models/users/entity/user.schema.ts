import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { JWT } from "./jwt.entity";
import { Gender, Role, SocialType, UserStatus } from "./user.enum";

@Schema({ timestamps: true })
export class UserModel {
  @Prop()
  email: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  name: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  avatar: string;

  @Prop()
  phone: string;

  @Prop({ type: Number, enum: SocialType })
  socialType: SocialType;

  @Prop()
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

  @Prop({ type: Number, enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;
}

export type UserDocument = UserModel & Document;

export const UserSchema = SchemaFactory.createForClass(UserModel);
