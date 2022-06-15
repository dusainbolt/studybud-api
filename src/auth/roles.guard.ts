import { AuthService } from "./auth.service";
import { GqlExecutionContext } from "@nestjs/graphql";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/models/users/entity/user.enum";
import { Constant } from "src/utils/constant";

export const ROLES_KEY = "roles";
export const Roles = (roles: Role[]) => SetMetadata(ROLES_KEY, roles);
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get required role
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    // Get context GraphQL
    const ctx = GqlExecutionContext.create(context).getContext();
    const headers = ctx.req.headers;
    if (!headers?.authorization) {
      return false;
    }
    // Set Context for user
    ctx[Constant.context.USER] = await this.authService.validateToken(
      headers.authorization
    );

    // allow any auth with admin
    if (ctx[Constant.context.USER].roles?.includes(Role.ADMIN)) {
      return true;
    }

    return requiredRoles.some((role) =>
      ctx[Constant.context.USER].roles?.includes(role)
    );
  }
}
