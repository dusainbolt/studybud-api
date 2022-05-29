import * as DataLoader from "dataloader";
import { Helper } from "src/utils/helper";
import { User } from "./users/entity/user.entity";
import { UserRepository } from "./users/user.repository";
import { UserService } from "./users/user.service";

class LoaderService {
  responseLoader(models, ids: string[]) {
    const modelsMap = Helper.mapFromArray(models, (model: any) => model.id);
    return ids.map((id) => modelsMap[id]);
  }
  userLoader(userRepository: UserRepository) {
    return new DataLoader<string, User>(async (ids: string[]) => {
      const users = await userRepository.findAll({ _id: { $in: ids } });
      return this.responseLoader("users" as any, ids);
    });
  }
  // tagLoader(tagService: TagService) {
  //   return new DataLoader<string, Tag>(async (ids: string[]) => {
  //     // const tags = await tagService.findByIds(ids);
  //     return this.responseLoader("tags" as any, ids);
  //   });
  // }
}

export const loaderService = new LoaderService();
