import { Router } from "express";
import suppliesController from "../controllers/supplies-controller";

const suppliesRouter = Router();

suppliesRouter.get("/", (req, res) => {
  suppliesController.getAll(req, res);
});

export default suppliesRouter;
