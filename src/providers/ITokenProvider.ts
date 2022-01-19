export interface ICredentialsForCreateToken {
    email: string;
    password: string;
}

export interface ITokenProvider {
    createToken: (credential: ICredentialsForCreateToken) => Promise<string>;
    isValidToken: (token: string) => Promise<boolean>;
}