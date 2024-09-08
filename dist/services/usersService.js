"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const usersModel_1 = __importDefault(require("../models/usersModel"));
class UsersService {
    static async create(data) {
        const { name, email } = data;
        try {
            const id = (0, uuid_1.v4)();
            const usersDb = await usersModel_1.default.read();
            usersDb.users.push({ name, email, id });
            usersModel_1.default.write(usersDb);
            return id;
        }
        catch (error) {
            throw error;
        }
    }
    static async read() {
        try {
            const users = await usersModel_1.default.read();
            return users;
        }
        catch (error) {
            throw error;
        }
    }
    static async getByEmail(email) {
        try {
            const usersDb = await UsersService.read();
            const user = usersDb.users.find((user) => user.email === email);
            return user;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = UsersService;
