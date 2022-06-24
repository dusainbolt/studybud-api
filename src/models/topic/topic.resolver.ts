import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Mission } from "../mission/entity/mission.entity";
import { Topic } from "./entity/topic.entity";
import { TopicDocument } from "./entity/topic.schema";
import { TopicRepository } from "./topic.repository";

@Resolver(Topic)
export class TopicResolver {
  constructor(private readonly topicRepository: TopicRepository) {}

  @Query(() => [Topic])
  async getAllTopic(): Promise<Topic[]> {
    return await this.topicRepository.findAll();
  }

  @ResolveField(() => [Mission])
  async missionData(@Parent() topic: TopicDocument) {
    const data = await topic.populate({ path: "missions" }).execPopulate();
    return data.missions;
  }
}
