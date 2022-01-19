interface ICredentialToCreateToken {
    email: string;
    password: string;
}

export interface ITokenProvider {
    createToken: (credential: ICredentialToCreateToken) => Promise<string>;
}