"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriesController_1 = __importDefault(require("../controllers/categoriesController"));
const check_token_1 = __importDefault(require("../middlewares/check-token"));
const CategoriesRouter = (0, express_1.Router)();
CategoriesRouter.get("/", categoriesController_1.default.getAll);
CategoriesRouter.get("/:id", categoriesController_1.default.getById);
CategoriesRouter.post("/create", check_token_1.default, categoriesController_1.default.create);
CategoriesRouter.patch("/update/:id", check_token_1.default, categoriesController_1.default.update);
CategoriesRouter.delete("/delete/:id", check_token_1.default, categoriesController_1.default.deleteById);
exports.default = CategoriesRouter;
