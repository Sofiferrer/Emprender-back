"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const suppliersController_1 = __importDefault(require("../controllers/suppliersController"));
const suppliersRouter = (0, express_1.Router)();
suppliersRouter.get("/", suppliersController_1.default.getAll);
suppliersRouter.get("/:id", suppliersController_1.default.getById);
suppliersRouter.post("/create", suppliersController_1.default.create);
suppliersRouter.patch("/update/:id", suppliersController_1.default.update);
suppliersRouter.delete("/delete/:id", suppliersController_1.default.deleteById);
exports.default = suppliersRouter;
