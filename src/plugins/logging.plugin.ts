import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Plugin } from "@nestjs/graphql";
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from "apollo-server-plugin-base";
import { JWTData } from "src/models/users/dto/jwt-data.dto";
import { Constant } from "src/utils/constant";
import { Helper } from "src/utils/helper";
import { MSG } from "src/utils/message";
import { HashService } from "./../hash/hash.service";

export const DEC_START_REQUEST = "Start:";
export const DEC_GRAPHQL = "Body:";
export const DEC_END_REQUEST = "End:";

export type location = {
  ip: string;
  city: string;
  region: string;
  regionCode: string;
  countryCode: string;
  countryName: string;
  latitude: string;
  longitude: string;
  timezone: string;
};

// get duration time request => ms
function getDurationRequest(request): Number {
  return new Date().getTime() - request.timeRequest;
}

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  private readonly logger = new Logger(LoggingPlugin.name);
  private isLocal: boolean = true;
  constructor(
    private hashService: HashService,
    private configService: ConfigService
  ) {
    this.isLocal =
      configService.get(Constant.env.NODE_ENV) === Constant.env.LOCAL;
  }
  // get user ip with params headers
  getUserIpAddress(req): String {
    const hashLocation = req.headers["x-forwarded-app"];
    if (!hashLocation) return null;
    // encrypt hash geo data
    const location: location = this.hashService.unHashCryptoAES(hashLocation);
    req.location = location;
    return `${location?.ip} - ${location?.countryCode} - ${location.city} - lat: ${location?.latitude} long: ${location?.longitude}`;
  }

  // validate server hash with MD5
  validateHashServer(headers, timeServer): any {
    const { hash, timestamp } = headers;
    const durationTime = timeServer - timestamp;
    if (
      hash !==
        this.hashService.hashMD5Crypto(this.configService.get("API_KEY")) ||
      durationTime > 100
    ) {
      throw Helper.apolloError(MSG.system.INVALID_API_KEY);
    }
  }

  requestDidStart(service): GraphQLRequestListener {
    const { req } = service.context;

    // Validate & log request if production
    if (req.headers && !this.isLocal) {
      // get time server
      const timeServer = Math.floor(Date.now() / 1000);
      // handle validate
      this.validateHashServer(req.headers, timeServer);

      // handle log info request
      // const ipAddress = this.getUserIpAddress(req);
      // this.logger.debug(`${DEC_START_REQUEST} ${timeServer}`);

      // Set time request
      service.timeRequest = new Date().getTime();

      if (req.body.operationName === "IntrospectionQuery") {
        return;
      }

      this.logger.debug(`${DEC_GRAPHQL} ${req.body.operationName}`);
      this.logger.verbose(JSON.stringify(req.body.variables));

      return {
        willSendResponse(requestContext: any) {
          // handle log info when completed request
          const user: JWTData = requestContext.context.user;
          const prefix = user ? `${user.email}` : "";
          const messageResponse = `${DEC_END_REQUEST} ${prefix} ${getDurationRequest(
            requestContext
          )}ms`;

          new Logger().log(messageResponse);
        },
      };
    }
  }
}
