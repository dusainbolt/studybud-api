import { Role } from "../entity/user.enum";

export type JWTData = {
  id: string;

  username: string;

  email: string;

  roles: Role[];
};
