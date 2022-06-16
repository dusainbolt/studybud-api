import { Module } from "@nestjs/common";
import { MissionModule } from "./mission/mission.module";
import { TopicModule } from "./topic/topic.module";
import { UsersModule } from "./users/user.module";
import { StandardModule } from "./standard/standard.module";
import { UserRepository } from "./users/user.repository";
import { Role, UserStatus } from "./users/entity/user.enum";
import { HashService } from "src/hash/hash.service";
import { HashModule } from "src/hash/hash.module";
import { TopicRepository } from "./topic/topic.repository";

@Module({
  imports: [
    UsersModule,
    TopicModule,
    MissionModule,
    StandardModule,
    HashModule,
  ],
})
export class ModelsModule {
  private adminData = {
    email: "dulh181199@gmail.com",
    username: "dusainbotl",
  };

  constructor(
    private readonly userRepository: UserRepository,
    private readonly topicRepository: TopicRepository,
    private readonly hashService: HashService
  ) {
    this.seedData();
  }

  seedData = async () => {
    const filterAdmin = {
      email: this.adminData.email,
      username: this.adminData.username,
      roles: { $in: [Role.ADMIN] },
    };
    let admin = await this.userRepository.findOne(filterAdmin);

    if (!admin) {
      const password = await this.hashService.hashBcrypt("du@dev1234");
      admin = await this.userRepository.create({
        username: this.adminData.username,
        email: this.adminData.email,
        roles: [Role.ADMIN],
        status: UserStatus.ACTIVE,
        password,
      });
    }

    const countTopic = await this.topicRepository.countDocument();
    if (countTopic === 0) {
      const topic = await this.topicRepository.create({
        name: "Ngoại ngữ",
        owner: admin._id,
      });
      console.log("countTopic: ", topic);
    }
  };
}
