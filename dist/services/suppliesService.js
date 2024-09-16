"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const suppliesModel_1 = __importDefault(require("../models/suppliesModel"));
const supply_1 = require("../schemas/supply");
class SuppliesService {
    static async create(data) {
        try {
            const validationResult = (0, supply_1.validateSupply)(data);
            if (!validationResult.success) {
                const error = new Error("Validación fallida");
                error["details"] = validationResult.error.errors;
                throw error;
            }
            const id = (0, uuid_1.v4)();
            const suppliesDb = await suppliesModel_1.default.read();
            suppliesDb.supplies.push({ id, ...validationResult.data });
            suppliesModel_1.default.write(suppliesDb);
            return { id, ...validationResult.data };
        }
        catch (error) {
            throw error;
        }
    }
    static async read(where) {
        try {
            const { supplies } = await suppliesModel_1.default.read();
            console.log(where);
            if (!where || Object.keys(where).length === 0) {
                //si no hay querys devuelvo lista completa
                return supplies;
            }
            const filteredSupplies = supplies.filter((supply) => supply.name.includes(where.name));
            return filteredSupplies;
        }
        catch (error) {
            throw error;
        }
    }
    static async update(id, data) {
        try {
            const validationResult = (0, supply_1.validateUpdateSupply)(data);
            if (!validationResult.success) {
                const error = new Error("Validación fallida");
                error["details"] = validationResult.error.errors;
                throw error;
            }
            const suppliesDb = await suppliesModel_1.default.read();
            const findSupply = suppliesDb.supplies.find((supply) => supply.id === id);
            const updatedSupply = { ...findSupply, ...validationResult.data };
            const updatedSupplies = suppliesDb.supplies.map((supply) => supply.id === id ? { ...supply, ...validationResult.data } : supply);
            suppliesDb.supplies = updatedSupplies;
            suppliesModel_1.default.write(suppliesDb);
            console.log(updatedSupply);
            return updatedSupply;
        }
        catch (error) {
            throw error;
        }
    }
    static async deleteById(id) {
        try {
            const suppliesDb = await suppliesModel_1.default.read();
            const supplies = suppliesDb.supplies.filter((supply) => supply.id != id);
            if (suppliesDb.supplies.length == supplies.length) {
                const error = new Error("Insumo no encontrado");
                error["statusCode"] = 404;
                throw error;
            }
            suppliesDb.supplies = supplies;
            await suppliesModel_1.default.write(suppliesDb);
            return id;
        }
        catch (error) {
            throw error;
        }
    }
    static async getById(id) {
        try {
            const { supplies } = await suppliesModel_1.default.read();
            const supply = supplies.find((supply) => supply.id === id);
            if (!supply) {
                const error = new Error("Insumo no encontrado");
                error["statusCode"] = 404;
                throw error;
            }
            return supply;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = SuppliesService;
