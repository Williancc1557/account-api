
import { TokenProvider } from "../../providers/implements/TokenProvider";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserUserCaseController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const tokenProvider = new TokenProvider();

const userRepository = new PostgresUsersRepository();

const createUserUserCase = new CreateUserUseCase(userRepository, tokenProvider);

export const createUserController = new CreateUserUserCaseController(
    createUserUserCase
);