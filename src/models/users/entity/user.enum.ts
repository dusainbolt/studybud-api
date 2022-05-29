import { registerEnumType } from "@nestjs/graphql";

export enum Role {
  USER,
  ADMIN,
  CREATOR,
}

registerEnumType(Role, {
  name: "Role",
  description: "The role of user",
});

export enum UserStatus {
  ACTIVE,
  INACTIVE,
  PAUSE,
  BLOCK,
}

registerEnumType(UserStatus, {
  name: "UserStatus",
  description: "The status of user",
});

export enum Gender {
  MALE,
  FEMALE,
  OTHER,
}

registerEnumType(Gender, {
  name: "Gender",
  description: "The gender of user",
});

export enum SocialType {
  FACEBOOK,
  GOOGLE,
}

registerEnumType(SocialType, {
  name: "SocialType",
  description: "The SocialType of authentication user",
});
