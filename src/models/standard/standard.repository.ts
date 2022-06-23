import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Constant } from "src/utils/constant";
import { Standard } from "./entity/standard.entity";
import { StandardDocument } from "./entity/standard.schema";

@Injectable()
export class StandardRepository {
  constructor(
    @InjectModel(Constant.schema.STANDARD)
    public StandardModel: Model<StandardDocument>
  ) {}

  async create(data: Standard): Promise<StandardDocument> {
    return this.StandardModel.create(data);
  }

  async insertMany(data: Standard[]): Promise<StandardDocument[]> {
    return this.StandardModel.insertMany(data);
  }

  async countDocument(filter: FilterQuery<Standard> = {}): Promise<Number> {
    return this.StandardModel.countDocuments(filter);
  }
}
