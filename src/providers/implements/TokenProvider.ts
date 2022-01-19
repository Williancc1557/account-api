import { sign, verify } from "jsonwebtoken";
import type { ICredentialsForCheckValidToken, ICredentialsForCreateToken, ITokenProvider } from "../ITokenProvider";

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

    public async isValidToken(credentialsForCheckToken: ICredentialsForCheckValidToken): Promise<boolean> {
        try {
            verify(
                credentialsForCheckToken.token,
                credentialsForCheckToken.email
            );
            return true;
        } catch {
            return false;
        }
    }
}
