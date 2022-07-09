import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { FilterQuery } from "mongoose";
import { Roles } from "src/auth/roles.guard";
import { Role } from "src/models/models.enum";
import { Constant } from "src/utils/constant";
import { Helper } from "src/utils/helper";
import { MSG } from "src/utils/message";
import { Mission } from "../mission/entity/mission.entity";
import { Standard } from "../standard/entity/standard.entity";
import { Topic } from "../topic/entity/topic.entity";
import { UserDocument } from "../users/entity/user.schema";
import { StudyRequest } from "./entity/study-request.entity";
import { StudyRequestDocument } from "./entity/study-request.schema";
import {
  CreateStudyRequestInput,
  UpdateStudyRequestInput,
} from "./graph/create-study-request.graph";
import { SearchStudyRequestInput } from "./graph/search-study-request";
import {
  SearchStudybudInput,
  SearchStudybudOutput,
} from "./graph/search-studybud";
import { StudyRequestRepository } from "./study-request.repository";
import { StudyRequestService } from "./study-request.service";

@Resolver(StudyRequest)
export class StudyRequestResolver {
  constructor(
    private readonly studyRequestRepository: StudyRequestRepository,
    private readonly studyRequestService: StudyRequestService
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

  @Query(() => [SearchStudybudOutput])
  async searchStudybud(
    @Args("input") input: SearchStudybudInput
  ): Promise<SearchStudybudOutput[]> {
    return await this.studyRequestService.searchStudybud(input);
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
  @Mutation(() => StudyRequest)
  async updateStudyRequest(
    @Args("input") input: UpdateStudyRequestInput,
    @Context(Constant.context.USER) user: UserDocument
  ): Promise<StudyRequest> {
    const studyRequestUpdate =
      await this.studyRequestRepository.findOneAndUpdate(
        {
          owner: user.id,
          _id: input.requestId,
        },
        input,
        { new: true }
      );
    if (!studyRequestUpdate) {
      throw Helper.apolloError(MSG.logic.INVALID_STUDY_REQUEST);
    }
    return studyRequestUpdate;
  }

  @ResolveField(() => Standard)
  async standardData(@Parent() studyRequest: StudyRequestDocument) {
    return (await studyRequest.populate({ path: "standard" }).execPopulate())
      .standard;
  }

  @ResolveField(() => Mission)
  async missionData(@Parent() studyRequest: StudyRequestDocument) {
    return (await studyRequest.populate({ path: "mission" }).execPopulate())
      .mission;
  }

  @ResolveField(() => Topic)
  async topicData(@Parent() studyRequest: StudyRequestDocument) {
    return (await studyRequest.populate({ path: "topic" }).execPopulate())
      .topic;
  }
}
