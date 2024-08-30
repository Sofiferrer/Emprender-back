"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const suppliesModel_1 = __importDefault(require("../models/suppliesModel"));
class SuppliesService {
    static async read() {
        try {
            const supplies = await suppliesModel_1.default.read();
            return supplies;
        }
        catch (error) {
            throw error;
        }
    }
    static async create(data) {
        const { name, quantity, unit, category, price, supplier } = data;
        try {
            const id = (0, uuid_1.v4)();
            const suppliesDb = await suppliesModel_1.default.read();
            suppliesDb.supplies.push({
                id,
                name,
                quantity,
                unit,
                category,
                price,
                supplier,
            });
            suppliesModel_1.default.write(suppliesDb);
            return id;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = SuppliesService;
