import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Constant } from "src/utils/constant";
import { Topic } from "./entity/topic.entity";
import { TopicDocument } from "./entity/topic.schema";
@Injectable()
export class TopicRepository {
  constructor(
    @InjectModel(Constant.schema.TOPIC) public topicModel: Model<TopicDocument>
  ) {}

  async create(data: Topic): Promise<TopicDocument> {
    return this.topicModel.create(data);
  }

  async countDocument(filter: FilterQuery<Topic> = {}): Promise<Number> {
    return this.topicModel.countDocuments(filter);
  }

  async findAll(filter: FilterQuery<Topic> = {}): Promise<TopicDocument[]> {
    return this.topicModel.find(filter);
  }
}
