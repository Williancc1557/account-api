import { uuid } from "uuidv4";
export class User {
    public readonly userId: string;

    public userName: string;

    public userEmail: string;

    public userCpf: string;

    public userPassword: string;

    public constructor(props: Omit<User, "userId">, userId?: string) {
        Object.assign(this, props);

        if (!userId) {
            this.userId = uuid();
        }
    }
}