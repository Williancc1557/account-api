import { sign } from "jsonwebtoken";
import type { ICredentialsForCreateToken, ITokenProvider } from "../ITokenProvider";

export class TokenProvider implements ITokenProvider {
    public async createToken(credential: ICredentialsForCreateToken): Promise<string> {
        const tokenUser = sign(
            credential.email,
            credential.password,
            {
                expiresIn: "5h",
            }
        );

        return tokenUser;
    }

    public isValidToken: (token: string) => Promise<boolean>;
}
