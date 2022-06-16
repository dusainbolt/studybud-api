import { Resolver } from "@nestjs/graphql";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Constant } from "src/utils/constant";
import { TopicDocument } from "./entity/topic.schema";
import { Topic } from "./entity/user.entity";

@Resolver()
export class TopicRepository {
  constructor(
    @InjectModel(Constant.schema.TOPIC) public topicModel: Model<TopicDocument> // private hashService: HashService, // private appLogger: AppLogger
  ) {}

  async create(data: Topic): Promise<TopicDocument> {
    return this.topicModel.create(data);
  }

  async countDocument(filter: FilterQuery<Topic> = {}): Promise<Number> {
    return this.topicModel.countDocuments(filter);
  }
}
