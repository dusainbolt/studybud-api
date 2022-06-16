import { Module } from "@nestjs/common";
import { TopicService } from "./topic.service";
import { TopicResolver } from "./topic.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Constant } from "src/utils/constant";
import { TopicSchema } from "./entity/topic.schema";
import { TopicRepository } from "./topic.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Constant.schema.TOPIC, schema: TopicSchema },
    ]),
  ],
  providers: [TopicService, TopicResolver, TopicRepository],
  exports: [TopicRepository],
})
export class TopicModule {}
