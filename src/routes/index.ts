import { Router } from "express";
import suppliesRouter from "./suppliesRouter";
import suppliersRouter from "./suppliersRouter";
import authRouter from "./authRouter";
import recipesRouter from "./recipesRouter";
import CategoriesRouter from "./categoriesRouter";

const indexRouter = Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/supplies", suppliesRouter);
indexRouter.use("/suppliers", suppliersRouter);
indexRouter.use("/recipes", recipesRouter);
indexRouter.use("/categories", CategoriesRouter);

export default indexRouter;
