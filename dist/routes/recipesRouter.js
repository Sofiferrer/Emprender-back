"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipesController_1 = __importDefault(require("../controllers/recipesController"));
const check_token_1 = __importDefault(require("../middlewares/check-token"));
const RecipesRouter = (0, express_1.Router)();
RecipesRouter.get("/", recipesController_1.default.getAll);
RecipesRouter.get("/:id", recipesController_1.default.getById);
RecipesRouter.post("/create", check_token_1.default, recipesController_1.default.create);
RecipesRouter.patch("/update/:id", check_token_1.default, recipesController_1.default.update);
RecipesRouter.delete("/delete/:id", check_token_1.default, recipesController_1.default.deleteById);
exports.default = RecipesRouter;
