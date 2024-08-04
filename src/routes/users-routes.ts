import { Router } from "express";
import db from "../database/users.json";

const usersRouter = Router();

usersRouter.get("/", (request, response) => {});

export default usersRouter;
