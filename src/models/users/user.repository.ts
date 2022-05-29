import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Constant } from "src/utils/constant";
import { User } from "./entity/user.entity";
import { UserDocument } from "./entity/user.schema";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(Constant.schema.USER) public userModel: Model<UserDocument> // private hashService: HashService, // private appLogger: AppLogger
  ) {
    // this.appLogger.setContext(UserService.name);
  }

  async create(userInfo: User): Promise<UserDocument> {
    return this.userModel.create(userInfo);
  }

  updateById(id: number, userInfo: User) {
    return this.userModel.findByIdAndUpdate(id, userInfo);
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findOne(filter: FilterQuery<any> = {}): Promise<UserDocument> {
    return this.userModel.findOne(filter);
  }

  async findAll(filter: FilterQuery<any> = {}): Promise<UserDocument[]> {
    return this.userModel.find(filter);
  }

  // async remove(id: number) {
  //   // await this.peopleRepository.delete(id);
  // }

  // // Create token for user
  // createToken({ id, email, firstName, lastName, roles }: User) {
  //   return this.hashService.signJWT({ id, email, firstName, lastName, roles });
  // }

  // async create(createUser: CreateUser): Promise<User> {
  //   const createdUser = new this.userModel(createUser);
  //   const data = await createdUser.save();
  //   return data;
  // }

  // async login(loginInput: LoginInput): Promise<LoginOutput> {
  //   // Check is exist user
  //   let user = await this.findOne(loginInput.credential);
  //   if (!user) {
  //     throw new AuthenticationError(MSG.msg.MSG_LOGIN_ERROR);
  //   }
  //   // Check password
  //   const isMatchPassword = await this.hashService.matchBcrypt(
  //     loginInput.password,
  //     user.password
  //   );
  //   // return result
  //   if (isMatchPassword) {
  //     return { user, token: this.createToken(user) };
  //   } else {
  //     throw new AuthenticationError(MSG.msg.MSG_LOGIN_ERROR);
  //   }
  // }

  // async findByIds(ids: string[]): Promise<User[]> {
  //   return this.userModel.find({ _id: { $in: ids } });
  // }

  // async findOne(credential: string): Promise<User> {
  //   const query: QueryFindUser = { username: {}, email: {} };
  //   // Find by email
  //   query.email.$eq = credential;
  //   // Find by username
  //   query.username.$eq = credential;
  //   // Query find by email or username
  //   return this.userModel.findOne({
  //     $or: [{ username: query.username }, { email: query.email }],
  //   });
  // }

  // async listSkill({ credential }: FindUserInput): Promise<UserSkillData[]> {
  //   const user = (await this.findOne(credential)) as UserDocument;
  //   // const data = user.populate({ path: 'skills.tagId' });
  //   const data = await user
  //     .populate({ path: "skills.tagId", model: TAG_NAME })
  //     .execPopulate();
  //   // Convert to user skill data
  //   return data.skills.map((item) => ({
  //     percent: item.percent,
  //     status: item.status,
  //     tagData: item.tagId,
  //   }));
  // }

  // async addSkill(
  //   skills: UserSkill[],
  //   user: UserDocument,
  //   isCheckDiff: boolean = true
  // ): Promise<Boolean> {
  //   // Check skill id duplicate
  //   if (isCheckDiff) {
  //     const arrSkill = helperService.getDiffArrayWithObjArray(
  //       [skills[0].tagId],
  //       user.skills,
  //       "tagId"
  //     );
  //     if (!arrSkill.length) {
  //       throw new GraphQLError(MSG.msg.ADD_SKILL_NOT_DIFF);
  //     }
  //   }
  //   // Add skill id  and save
  //   user.skills = user.skills.concat(skills);
  //   await user.save();
  //   // Return a skill user
  //   return true;
  // }

  // async updateSkill(skills: UserSkill[], user: UserDocument): Promise<Boolean> {
  //   user.skills = skills;
  //   await user.save();
  //   // Check skill id duplicate
  //   return true;
  // }

  // //   Update user skills by project techs
  // @OnEvent(Constant.event.CHANGE_USER_SKILL)
  // async changeSkillByProject({
  //   user,
  //   skillData,
  // }: {
  //   user: UserDocument;
  //   skillData: UserSkill[];
  // }) {
  //   this.appLogger.verbose(
  //     `EVENT ==============> ${Constant.event.CHANGE_USER_SKILL} by ${user.username}`
  //   );
  //   // Filter skill id duplicate
  //   const arrSkill = helperService.getDiffArrayWithObjArray(
  //     skillData,
  //     user.skills,
  //     "tagId"
  //   );
  //   // Create data skill default for user skill
  //   const dataSkill: UserSkill[] = arrSkill.map((tagId) => ({
  //     tagId,
  //     percent: 0,
  //     status: UserSkillStatus.INACTIVE,
  //   }));
  //   await this.addSkill(dataSkill, user, false);
  // }
}
