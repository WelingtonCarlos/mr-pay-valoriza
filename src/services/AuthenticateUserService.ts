import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const userRepositories = getCustomRepository(UsersRepositories);

    // Verificar se existe um usuário com o email informado
    const user = await userRepositories.findOne({ where: { email } });
    if (!user) {
      throw new Error("Email ou senha inválidos");
    }

    // Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Email ou senha inválidos");
    }

    // Se tudo estiver ok, retornar um token JWT
    const token = sign(
      {
        email: user.email,
      },
      "072f69012eeb432c7b348d3a9ee99b49",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
