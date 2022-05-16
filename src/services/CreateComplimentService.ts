import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

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
    const usersRepositories = getCustomRepository(UsersRepositories);

    // Check if user_sender is different from user_receiver
    if (user_sender === user_receiver) {
      throw new Error("User receiver is the same as user sender");
    }

    // Create a object to user_receiver
    const userReceiverExists = await usersRepositories.findOne(user_receiver);

    // Check if user_receiver exists
    if (!userReceiverExists) {
      throw new Error("User receiver not found");
    }

    // Create a object to user_sender
    const userSenderExists = await usersRepositories.findOne(user_sender);
    if (!userSenderExists) {
      throw new Error("User sender not found");
    }

    // Create compliment
    const compliment = complimentsRepositories.create({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    await complimentsRepositories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
