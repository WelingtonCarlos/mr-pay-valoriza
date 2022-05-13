import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

interface IComplementRequest {
  user_sender: string;
  user_receiver: string;
  tag_id: string;
  message: string;
}

class CreateComplimentService {
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: IComplementRequest) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );
  }
}

export { CreateComplimentService };
