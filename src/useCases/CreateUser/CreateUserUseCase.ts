import { User } from "../../entities/User";
import type { ITokenProvider } from "../../providers/ITokenProvider";
import type { IUsersRepository } from "../../repositories/IUserRepository";
import type { ICreateUserDTO } from "./CreateUserDTO";
import dotenv from "dotenv";
import { pinoConfig } from "../../logger/pino";
dotenv.config();


export class CreateUserUseCase {
    public constructor(
        private readonly userRepository: IUsersRepository,
        private readonly tokenProvider: ITokenProvider
    ) { }

    public async execute(data: ICreateUserDTO) {
        const user = new User(data);

        pinoConfig.info("Data created UseCase");

        await this.userRepository.saveUser({
            user,
            connectionStringDatabase: process.env.DATABASE_URL,
        });

        pinoConfig.info("User saved succefull. UseCase");

        await this.tokenProvider.createToken({
            email: data.userEmail,
            password: data.userPassword,
        });

        pinoConfig.info("Token created UseCase");
    }
}