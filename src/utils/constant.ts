export const Constant = {
  env: {
    NODE_ENV: "NODE_ENV",
    LOCAL: "local",
    JWT_SECRET: "JWT_SECRET",
    APP_KEY: "APP_KEY",
    JWT_EXPIRE: "JWT_EXPIRE",
    FACEBOOk_APP_ID: "FACEBOOk_APP_ID",
    FACEBOOk_APP_SECRET: "FACEBOOk_APP_SECRET",
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
  },
  imports: {
    FACEBOOK_STRATEGY: "facebook-token",
  },
};
