import { Pool } from "pg";
import type { User } from "../../entities/User";
import { pinoConfig } from "../../logger/pino";
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
        const userProfile = params.user;
        const database = this.connectDatabase(params.connectionStringDatabase);

        const isUserAlreadyExists = await this.findUserByCpfAndEmail({
            cpf: userProfile.userCpf,
            database,
            email: userProfile.userEmail,
        });

        if (isUserAlreadyExists) throw new Error("Cpf or Email already exists in the service.");

        pinoConfig.info("IsUserAlreadyExists retured undefined");

        await database.query("INSERT INTO (user_id, user_name, user_email, user_cpf) VALUES ($1, $2, $3, $4)", [userProfile.userId, userProfile.userName, userProfile.userEmail, userProfile.userCpf]);

        pinoConfig.info("Query createUser realizado com sucesso!");
    }

    public async findUserByCpfAndEmail(findUserByCpfAndEmail: IFindUserByCpfAndEmail): Promise<User> {
        const firstRow = 0;
        const databaseDataRequest: User = (await (await findUserByCpfAndEmail.database.query("SELECT * FROM users WHERE user_cpf = $1, user_email = $2", [findUserByCpfAndEmail.cpf, findUserByCpfAndEmail.email])).rows[firstRow]);
        return databaseDataRequest;
    }
}