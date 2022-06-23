import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { FilterQuery } from "mongoose";
import { Roles } from "src/auth/roles.guard";
import { Role } from "src/models/models.enum";
import { Constant } from "src/utils/constant";
import { Helper } from "src/utils/helper";
import { MSG } from "src/utils/message";
import { UserDocument } from "../users/entity/user.schema";
import { StudyRequest } from "./entity/study-request.entity";
import {
  CreateStudyRequestInput,
  UpdateStudyRequestInput,
} from "./graph/create-study-request.graph";
import { SearchStudyRequestInput } from "./graph/search-study-request";
import { StudyRequestRepository } from "./study-request.repository";

@Resolver(StudyRequest)
export class StudyRequestResolver {
  constructor(
    private readonly studyRequestRepository: StudyRequestRepository
  ) {}

  @Query(() => [StudyRequest])
  async searchStudyRequest(
    @Args("input") input: SearchStudyRequestInput
  ): Promise<StudyRequest[]> {
    const conditions: FilterQuery<StudyRequest> = {
      ...(input.userId && {
        owner: input.userId,
      }),
    };
    return await this.studyRequestRepository.findAll(conditions);
  }

  @Roles([Role.USER])
  @Mutation(() => StudyRequest)
  async createStudyRequest(
    @Args("input") input: CreateStudyRequestInput,
    @Context(Constant.context.USER) user: UserDocument
  ): Promise<StudyRequest> {
    return await this.studyRequestRepository.create({
      ...input,
      owner: user._id,
    });
  }

  @Roles([Role.USER])
  @Mutation(() => Boolean)
  async updateStudyRequest(
    @Args("input") input: UpdateStudyRequestInput,
    @Context(Constant.context.USER) user: UserDocument
  ): Promise<boolean> {
    const studyRequestUpdate =
      await this.studyRequestRepository.findOneAndUpdate(
        {
          owner: user.id,
          _id: input.requestId,
        },
        input
      );
    if (!studyRequestUpdate) {
      throw Helper.apolloError(MSG.logic.INVALID_STUDY_REQUEST);
    }
    return true;
  }
}
