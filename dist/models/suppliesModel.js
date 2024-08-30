"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const jsonfile_1 = require("jsonfile");
class SuppliesModel {
    static getFilePath() {
        return path_1.default.join(__dirname, "../database/supplies.json");
    }
    static async read() {
        try {
            return await (0, jsonfile_1.readFile)(this.getFilePath());
        }
        catch (error) {
            console.error("Error reading file:", error);
            throw error;
        }
    }
    static async write(data) {
        try {
            await (0, jsonfile_1.writeFile)(this.getFilePath(), data);
            return true;
        }
        catch (error) {
            console.error("Error writing file:", error);
            throw error;
        }
    }
}
exports.default = SuppliesModel;
