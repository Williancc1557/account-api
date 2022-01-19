import { Router } from "express";
import { createUserController } from "./useCases/CreateUser";
import type { Response, Request } from "express";


export const router = Router();

router.post("/user", (req: Request, res: Response) => {
    createUserController.handle(req, res);
});