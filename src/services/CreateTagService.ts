import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService {
  async execute(name: string) {
    const tagsRepository = getCustomRepository(TagsRepositories);

    // Verifica se o nome está preenchido
    if (!name) {
      throw new Error("Name is required");
    }

    // Verifica se o tag (de acordo com o nome) já existe
    const tagAlreadyExists = await tagsRepository.findOne({
      name,
    });
    if (tagAlreadyExists) {
      throw new Error("Tag já existente");
    }

    // Cria o tag
    const tag = tagsRepository.create({
      name,
    });

    await tagsRepository.save(tag);

    return tag;
  }
}

export { CreateTagService };
