import { User } from "../../entities/User";
import type { ITokenProvider } from "../../providers/ITokenProvider";
import type { IUsersRepository } from "../../repositories/IUserRepository";
import type { ICreateUserDTO } from "./CreateUserDTO";

export class CreateUserUserCase {
    public constructor(
        private readonly userRepository: IUsersRepository,
        private readonly createToken: ITokenProvider
    ) { }

    public async execute(data: ICreateUserDTO) {
        const accountAlreadyExists = await this.userRepository.findUserByCpf(data.userCpf);

        if (accountAlreadyExists) throw new Error("User already exists");

        const user = new User(data);

        await this.userRepository.saveUser(user);

        await this.createToken.createToken({
            email: data.userEmail,
            password: data.userPassword,
        });
    }
}