import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, QueryOptions } from "mongoose";
import { Constant } from "src/utils/constant";
import { StudyRequest } from "./entity/study-request.entity";
import { StudyRequestDocument } from "./entity/study-request.schema";

@Injectable()
export class StudyRequestRepository {
  constructor(
    @InjectModel(Constant.schema.STUDY_REQUEST)
    public studyRequestModel: Model<StudyRequestDocument>
  ) {}

  async create(data: StudyRequest): Promise<StudyRequestDocument> {
    return await this.studyRequestModel.create(data);
  }

  async countDocument(filter: FilterQuery<StudyRequest> = {}): Promise<Number> {
    return await this.studyRequestModel.countDocuments(filter);
  }

  async findAll(
    filter: FilterQuery<StudyRequest> = {}
  ): Promise<StudyRequestDocument[]> {
    return await this.studyRequestModel
      .find(filter)
      .sort({ [Constant.find.ORDER_BY]: Constant.find.DESC });
  }

  async findOneAndUpdate(
    filter: FilterQuery<StudyRequest> = {},
    data: StudyRequest,
    options: QueryOptions = {}
  ): Promise<StudyRequestDocument> {
    return await this.studyRequestModel.findOneAndUpdate(filter, data, options);
  }
}
