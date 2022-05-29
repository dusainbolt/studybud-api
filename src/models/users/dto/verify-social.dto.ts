import { User } from "../entity/user.entity";

export type VerifySocial = {
  token: string;
  user: User;
};
