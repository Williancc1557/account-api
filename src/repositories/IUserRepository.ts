import type { User } from "../entities/User";

export interface IUsersRepository {
    saveUser: (user: User) => Promise<void>;
    findUserByCpf: (cpf: string) => Promise<User>;
} 