import { Injectable } from "@nestjs/common";
import { FilterQuery, ObjectID } from "mongodb";
import { Gender, StatusOnOff } from "../models.enum";
import { User } from "../users/entity/user.entity";
import { StudyRequest } from "./entity/study-request.entity";
import {
  SearchStudybudInput,
  SearchStudybudOutput,
} from "./graph/search-studybud";
import { StudyRequestRepository } from "./study-request.repository";

@Injectable()
export class StudyRequestService {
  constructor(
    private readonly studyRequestRepository: StudyRequestRepository
  ) {}

  async searchStudybud(
    input: SearchStudybudInput
  ): Promise<SearchStudybudOutput[]> {
    const conditions: FilterQuery<StudyRequest> = {
      status: StatusOnOff.ON,
      ...(input.standard && {
        standard: new ObjectID(input.standard) as any,
      }),
      ...(input.mission && {
        mission: new ObjectID(input.mission) as any,
      }),
      ...(input.topic && {
        topic: new ObjectID(input.topic) as any,
      }),
      ...(input.pointValue && {
        pointValue: input.pointValue,
      }),
      ...(input.point && {
        point: {
          $gte: input.point[0],
          $lte: input.point[1],
        },
      }),
    };

    const conditionsUser: FilterQuery<User> = {
      ...(Gender[input.gender] && {
        gender: input.gender,
      }),
    };

    const result =
      await this.studyRequestRepository.studyRequestModel.aggregate([
        {
          $match: conditions,
        },
        {
          $group: {
            _id: { owner: "$owner" },
          },
        },
        {
          $lookup: {
            from: "users",
            let: { id: "$_id.owner" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$id"] },
                  ...conditionsUser,
                },
              },
            ],
            as: "user",
          },
        },
        { $unwind: "$user" },
      ]);
    console.log("result: ", result);
    return result;
  }
}
