import { Pool } from "pg";
import type { User } from "../../entities/User";
import type { IUsersRepository, ISaveUserRepository, IFindUserByCpfAndEmail } from "../IUserRepository";
export class PostgresUsersRepository implements IUsersRepository {
    public connectDatabase(connectionStringDatabase: string): Pool {
        const database = new Pool({
            connectionString: connectionStringDatabase,
            ssl: {
                rejectUnauthorized: false,
            },
        });
        return database;
    }

    public async saveUser(params: ISaveUserRepository) {

        const database = this.connectDatabase(params.connectionStringDatabase);

        const isUserAlreadyExists = await this.findUserByCpfAndEmail({
            cpf: params.user.userCpf,
            database,
            email: params.user.userEmail,
        });

        if (isUserAlreadyExists) throw new Error("Cpf or Email already exists in the service.");

        database.query("");
    }

    public async findUserByCpfAndEmail(findUserByCpfAndEmail: IFindUserByCpfAndEmail): Promise<User> {
        const firstRow = 0;
        const databaseDataRequest: User = (await (await findUserByCpfAndEmail.database.query("SELECT * FROM users WHERE user_cpf = $1, user_email = $2", [findUserByCpfAndEmail.cpf, findUserByCpfAndEmail.email])).rows[firstRow]);
        return databaseDataRequest;
    }
}