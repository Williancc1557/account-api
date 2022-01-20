import type { CreateUserUseCase } from "./CreateUserUseCase";
import type { Request, Response } from "express";
import { pinoConfig } from "../../logger/pino";
export class CreateUserUserCaseController {
    public constructor(
        private readonly createUserUserCase: CreateUserUseCase
    ) { }

    public async handle(req: Request, res: Response): Promise<Response> {
        const { name, password, cpf, email } = req.body;
        try {
            await this.createUserUserCase.execute({
                userName: name,
                userPassword: password,
                userEmail: email,
                userCpf: cpf,
            });
            const successfulRequestCode = 200;

            pinoConfig.info("HandleController não foi para o catch");

            return res.status(successfulRequestCode).send();
        } catch (err) {
            const failRequestStatusCode = 500;
            pinoConfig.info("HandleController foi para o catch");
            pinoConfig.info("Motivo do erro: " + err.message);
            return res.status(failRequestStatusCode).json({ error: err.message || "unexpected error" });
        }

    }
}