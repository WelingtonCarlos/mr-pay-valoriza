import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

class ListUserReceiveComplimentsService {
  async execute({ user_id }) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );
    const userReceiveCompliments = await complimentsRepositories.find({
      where: {
        user_receiver: user_id,
      },
    });

    return userReceiveCompliments;
  }
}

export { ListUserReceiveComplimentsService };
