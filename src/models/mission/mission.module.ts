import { Module } from "@nestjs/common";
import { MissionService } from "./mission.service";
import { MissionResolver } from "./mission.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Constant } from "src/utils/constant";
import { MissionSchema } from "./entity/mission.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Constant.schema.MISSION, schema: MissionSchema },
    ]),
  ],
  providers: [MissionService, MissionResolver],
})
export class MissionModule {}
