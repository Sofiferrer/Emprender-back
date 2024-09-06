"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const suppliesController_1 = __importDefault(require("../controllers/suppliesController"));
const suppliesRouter = (0, express_1.Router)();
suppliesRouter.get("/", suppliesController_1.default.getAll);
suppliesRouter.get("/:id", suppliesController_1.default.getById);
suppliesRouter.post("/create", suppliesController_1.default.create);
suppliesRouter.patch("/update/:id", suppliesController_1.default.update);
suppliesRouter.delete("/delete/:id", suppliesController_1.default.deleteById);
exports.default = suppliesRouter;
