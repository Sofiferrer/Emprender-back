"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const suppliesRouter_1 = __importDefault(require("./suppliesRouter"));
const suppliersRouter_1 = __importDefault(require("./suppliersRouter"));
const authRouter_1 = __importDefault(require("./authRouter"));
const recipesRouter_1 = __importDefault(require("./recipesRouter"));
const indexRouter = (0, express_1.Router)();
indexRouter.use("/auth", authRouter_1.default);
indexRouter.use("/supplies", suppliesRouter_1.default);
indexRouter.use("/suppliers", suppliersRouter_1.default);
indexRouter.use("/recipes", recipesRouter_1.default);
exports.default = indexRouter;
