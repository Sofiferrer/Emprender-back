"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const suppliesController_1 = __importDefault(require("../controllers/suppliesController"));
const suppliesRouter = (0, express_1.Router)();
suppliesRouter.get("/", suppliesController_1.default.getAll);
suppliesRouter.post("/create", suppliesController_1.default.create);
exports.default = suppliesRouter;
