import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Standard } from "../standard/entity/standard.entity";
import { Mission } from "./entity/mission.entity";
import { MissionDocument } from "./entity/mission.schema";

@Resolver(Mission)
export class MissionResolver {
  @ResolveField(() => [Standard])
  async standardData(@Parent() topic: MissionDocument) {
    const data = await topic.populate({ path: "standards" }).execPopulate();
    return data.standards;
  }
}
