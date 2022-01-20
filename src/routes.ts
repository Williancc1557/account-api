import { Router } from "express";
import { createUserController } from "./useCases/CreateUser";
import type { Response, Request } from "express";
import { pinoConfig } from "./logger/pino";


export const router = Router();

router.post("/user", (req: Request, res: Response) => {
    pinoConfig.info("Route /user executed");
    createUserController.handle(req, res);
});