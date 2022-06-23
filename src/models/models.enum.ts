import { registerEnumType } from "@nestjs/graphql";

/** COMMON ENUM */
export enum StatusOnOff {
  OFF = 0,
  ON = 1,
}

registerEnumType(StatusOnOff, {
  name: "StatusOnOff",
});

/** STANDARD ENUM */
export enum PointStandard {
  INPUT,
  SELECT,
}

registerEnumType(PointStandard, {
  name: "PointStandard",
});

/** USER ENUM */
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
  INACTIVE,
  ACTIVE,
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
  SYSTEM,
}

registerEnumType(SocialType, {
  name: "SocialType",
  description: "The SocialType of authentication user",
});
