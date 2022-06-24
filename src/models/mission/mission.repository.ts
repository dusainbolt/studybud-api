import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Constant } from "src/utils/constant";
import { Mission } from "./entity/mission.entity";
import { MissionDocument } from "./entity/mission.schema";

@Injectable()
export class MissionRepository {
  constructor(
    @InjectModel(Constant.schema.MISSION)
    public MissionModel: Model<MissionDocument>
  ) {}

  async create(data: Mission): Promise<MissionDocument> {
    return this.MissionModel.create(data);
  }

  async insertMany(data: Mission[]): Promise<MissionDocument[]> {
    return this.MissionModel.insertMany(data);
  }

  async countDocument(filter: FilterQuery<Mission> = {}): Promise<Number> {
    return this.MissionModel.countDocuments(filter);
  }
}
