export const Constant = {
  env: {
    LOCAL: "local",
    JWT_SECRET: "JWT_SECRET",
  },
  event: {
    CHANGE_USER_SKILL: "CHANGE_USER_SKILL",
  },
  find: {
    ORDER_BY: "createdAt",
    DESC: -1,
    ASC: 1,
    LIMIT: 10,
    OFFSET: 0,
  },
  schema: {
    USER: "User",
    TOPIC: "Topic",
    MISSION: "Mission",
  },
  imports: {
    FACEBOOK_STRATEGY: "facebook-token",
  },
  context: {
    USER: "user",
  },
};
