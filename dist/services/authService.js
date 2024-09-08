"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authModel_1 = __importDefault(require("../models/authModel"));
const createHash_1 = __importDefault(require("../utils/createHash"));
const uuid_1 = require("uuid");
const usersService_1 = __importDefault(require("./usersService"));
const users_1 = require("../schemas/users");
class AuthService {
    static async register(data) {
        try {
            const validationResult = (0, users_1.validateUser)(data);
            if (!validationResult.success) {
                const error = new Error("Validación fallida");
                error["details"] = validationResult.error.errors;
                throw error;
            }
            const { name, email, password } = validationResult.data;
            const user = await usersService_1.default.getByEmail(email);
            if (user) {
                const error = new Error("El usuario ya existe");
                error["statusCode"] = 400;
                throw error;
            }
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
        try {
            const validationResult = (0, users_1.validateLoginUser)(data);
            if (!validationResult.success) {
                const error = new Error("Validación fallida");
                error["details"] = validationResult.error.errors;
                throw error;
            }
            const { email, password } = validationResult.data;
            const authDb = await authModel_1.default.read();
            const user = await usersService_1.default.getByEmail(email);
            const userAuth = await AuthService.getByUserId(user.id);
            if (!user) {
                const error = new Error("Usuario no encontrado");
                error["statusCode"] = 404;
                throw error;
            }
            if (userAuth.password != (0, createHash_1.default)(password)) {
                const error = new Error("La contrasenia es incorrecta");
                error["statusCode"] = 400;
                throw error;
            }
            const token = (0, createHash_1.default)((0, uuid_1.v4)());
            const updatedAuthDb = authDb.auth.map((auth) => auth.userId === user.id ? { ...auth, token: token } : auth);
            authDb.auth = updatedAuthDb;
            await authModel_1.default.write(authDb);
            return token;
        }
        catch (error) {
            throw error;
        }
    }
    static async logout(token) {
        try {
            const authDb = await authModel_1.default.read();
            const authUser = authDb.auth.find((auth) => auth.token == token);
            if (!authUser) {
                const error = new Error("token no encontrado");
                error["statusCode"] = 404;
                throw error;
            }
            authUser.token = null;
            await authModel_1.default.write(authDb);
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
