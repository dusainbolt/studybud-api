import { Module } from "@nestjs/common";
import { StandardService } from "./standard.service";
import { StandardResolver } from "./standard.resolver";
import { StandardRepository } from "./standard.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Constant } from "src/utils/constant";
import { StandardSchema } from "./entity/standard.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Constant.schema.STANDARD, schema: StandardSchema },
    ]),
  ],
  providers: [StandardService, StandardResolver, StandardRepository],
  exports: [StandardRepository],
})
export class StandardModule {}
