import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

class ListUserSendComplimentsService {
  async execute({ user_id }) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );
    const userSendCompliments = await complimentsRepositories.find({
      where: {
        user_sender: user_id,
      },
    });

    return userSendCompliments;
  }
}

export { ListUserSendComplimentsService };
