import { Router } from "express";
import suppliesRouter from "./suppliesRouter";
import suppliersRouter from "./suppliersRouter";
import authRouter from "./authRouter";
import recipesRouter from "./recipesRouter";

const indexRouter = Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/supplies", suppliesRouter);
indexRouter.use("/suppliers", suppliersRouter);
indexRouter.use("/recipes", recipesRouter);

export default indexRouter;
