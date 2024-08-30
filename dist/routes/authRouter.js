"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const authRouetr = (0, express_1.Router)();
authRouetr.post("/register", authController_1.default.register);
authRouetr.post("/login", authController_1.default.login);
authRouetr.post("/logout", authController_1.default.logout);
exports.default = authRouetr;
