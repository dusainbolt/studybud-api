import { Role } from "src/models/models.enum";

export type JWTData = {
  id: string;

  username: string;

  email: string;

  roles: Role[];
};
