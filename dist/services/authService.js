"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authModel_1 = __importDefault(require("../models/authModel"));
const createHash_1 = __importDefault(require("../utils/createHash"));
const uuid_1 = require("uuid");
const usersService_1 = __importDefault(require("./usersService"));
class AuthService {
    static async register(data) {
        const { name, email, password } = data;
        try {
            const userId = await usersService_1.default.create({ name, email });
            const authDb = await authModel_1.default.read();
            const token = (0, createHash_1.default)((0, uuid_1.v4)());
            authDb.auth.push({
                id: (0, uuid_1.v4)(),
                userId,
                password: (0, createHash_1.default)(password),
                token,
            });
            authModel_1.default.write(authDb);
            return token;
        }
        catch (error) {
            throw error;
        }
    }
    static async login(data) {
        const { email, password } = data;
        try {
            const user = await usersService_1.default.getByEmail(email);
            const userAuth = await AuthService.getByUserId(user.id);
            if (userAuth.password != (0, createHash_1.default)(password)) {
                const error = new Error("La contrasenia es incorrecta");
                error["statusCode"] = 400;
                throw error;
            }
            return userAuth.token;
        }
        catch (error) {
            throw error;
        }
    }
    static async getByUserId(id) {
        try {
            const authDb = await authModel_1.default.read();
            const user = authDb.auth.find((user) => user.userId === id);
            if (!user) {
                const error = new Error("Usuario no encontrado");
                error["statusCode"] = 404;
                throw error;
            }
            return user;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = AuthService;
