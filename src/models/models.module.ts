import { Module } from "@nestjs/common";
import { MissionModule } from "./mission/mission.module";
import { TopicModule } from "./topic/topic.module";
import { UsersModule } from "./users/user.module";
import { StandardModule } from "./standard/standard.module";
import { UserRepository } from "./users/user.repository";
import { PointStandard, Role, UserStatus } from "src/models/models.enum";
import { HashService } from "src/hash/hash.service";
import { HashModule } from "src/hash/hash.module";
import { TopicRepository } from "./topic/topic.repository";
import { StandardRepository } from "./standard/standard.repository";
import { MissionRepository } from "./mission/mission.repository";
import { StudyRequestModule } from "./study-request/study-request.module";
import { Standard } from "./standard/entity/standard.entity";

@Module({
  imports: [
    UsersModule,
    TopicModule,
    MissionModule,
    StandardModule,
    HashModule,
    StudyRequestModule,
  ],
})
export class ModelsModule {
  private adminData = {
    email: "dulh181199@gmail.com",
    username: "dusainbolt",
  };

  constructor(
    private readonly userRepository: UserRepository,
    private readonly topicRepository: TopicRepository,
    private readonly missionRepository: MissionRepository,
    private readonly standardRepository: StandardRepository,
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
      await this.seedTopicData(admin, {
        topicName: "Ngoại ngữ",
        missionData: [
          {
            name: "Tiếng Anh",
            standardData: [
              {
                name: "TOEIC",
                point: 990,
              },
              {
                name: "TOEFL",
                point: 120,
              },
              {
                name: "IELTS",
                point: 9,
              },
            ],
          },
          {
            name: "Tiếng Nhật",
            standardData: [
              {
                name: "JLPT",
                pointData: ["N1", "N2", "N3", "N4", "N5"],
                pointType: PointStandard.SELECT,
              },
            ],
          },
          {
            name: "Tiếng Trung",
            standardData: [
              {
                name: "HSK",
                pointData: [
                  "HSK 1",
                  "HSK 2",
                  "HSK 3",
                  "HSK 4",
                  "HSK 5",
                  "HSK 6",
                ],
                pointType: PointStandard.SELECT,
              },
              {
                name: "HSKK",
                pointType: PointStandard.SELECT,
                pointData: ["Sơ cấp", "Trung cấp", "Cao cấp"],
              },
              {
                name: "TOCFL A",
                pointType: PointStandard.SELECT,
                pointData: ["Cấp 1", "Cấp 2"],
              },
              {
                name: "TOCFL B",
                pointType: PointStandard.SELECT,
                pointData: ["Cấp 3", "Cấp 4"],
              },
              {
                name: "TOCFL C",
                pointType: PointStandard.SELECT,
                pointData: ["Cấp 5", "Cấp 6"],
              },
            ],
          },
        ],
      });
    }
  };
  seedTopicData = async (
    admin,
    data: {
      topicName: string;
      missionData: Array<{
        name: string;
        standardData: Standard[];
      }>;
    }
  ) => {
    const topic = await this.topicRepository.create({
      name: data.topicName,
      owner: admin._id,
    });

    const missions = await this.missionRepository.insertMany(
      data.missionData.map((item) => ({
        owner: admin._id,
        topic: topic._id,
        name: item.name,
      }))
    );

    topic.missions.push(...missions.map((item) => item._id));
    await topic.save();

    let standardData = [];

    for (let i = 0; i < missions.length; i++) {
      standardData.push(
        ...data.missionData[i].standardData.map((item) => ({
          ...item,
          owner: admin._id,
          mission: missions[i]._id,
        }))
      );
      const standards = await this.standardRepository.insertMany(standardData);
      missions[i].standards.push(...standards.map((item) => item._id));
      await missions[i].save();
      standardData = [];
    }
  };
}
