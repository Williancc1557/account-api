import type { Pool } from "pg";
import type { User } from "../entities/User";

export interface ISaveUserRepository {
    user: User;
    connectionStringDatabase: string;
}

export interface IFindUserByCpfAndEmail {
    cpf: string;
    database: Pool;
    email: string;
}

export interface IUsersRepository {
    connectDatabase: (connectionStringDatabase: string) => Pool;
    saveUser: (saveUserRepository: ISaveUserRepository) => Promise<void>;
    findUserByCpfAndEmail: (findUserByCpfAndEmail: IFindUserByCpfAndEmail) => Promise<User>;
} 