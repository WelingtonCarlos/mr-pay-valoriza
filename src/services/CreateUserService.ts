import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password?: string;
}

class CreateUserService {
  async execute({ name, email, admin, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    // Verifica se o email está preenchido
    if (!email) {
      throw new Error("Email is required");
    }

    // Verifica se o usuário (de acordo com o email) já existe
    const userAlreadyExists = await usersRepository.findOne({
      email,
    });
    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    // Verifica se a senha está preenchida
    if (!password) {
      throw new Error("Password is required");
    }

    const passwordHash = await hash(password, 8);

    // Cria o usuário
    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
