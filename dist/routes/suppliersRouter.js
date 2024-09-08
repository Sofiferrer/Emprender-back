"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const suppliersController_1 = __importDefault(require("../controllers/suppliersController"));
const check_token_1 = __importDefault(require("../middlewares/check-token"));
const suppliersRouter = (0, express_1.Router)();
suppliersRouter.get("/", suppliersController_1.default.getAll);
suppliersRouter.get("/:id", suppliersController_1.default.getById);
suppliersRouter.post("/create", check_token_1.default, suppliersController_1.default.create);
suppliersRouter.patch("/update/:id", check_token_1.default, suppliersController_1.default.update);
suppliersRouter.delete("/delete/:id", check_token_1.default, suppliersController_1.default.deleteById);
exports.default = suppliersRouter;
