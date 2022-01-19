export interface ICredentialsForCreateToken {
    email: string;
    password: string;
}

export interface ICredentialsForCheckValidToken {
    token: string;
    email: string;
}

export interface ITokenProvider {
    createToken: (credentials: ICredentialsForCreateToken) => Promise<string>;
    isValidToken: (credentialsForCheckToken: ICredentialsForCheckValidToken) => Promise<boolean>;
}