import { Module } from "@nestjs/common";
import { StudyRequestService } from "./study-request.service";
import { StudyRequestResolver } from "./study-request.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Constant } from "src/utils/constant";
import { StudyRequestSchema } from "./entity/study-request.schema";
import { StudyRequestRepository } from "./study-request.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Constant.schema.STUDY_REQUEST, schema: StudyRequestSchema },
    ]),
  ],
  providers: [
    StudyRequestService,
    StudyRequestResolver,
    StudyRequestRepository,
  ],
  exports: [StudyRequestRepository],
})
export class StudyRequestModule {}
