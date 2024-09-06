"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const supplier_1 = require("../schemas/supplier");
const suppliersModel_1 = __importDefault(require("../models/suppliersModel"));
class SuppliersService {
    static async create(data) {
        try {
            const validationResult = (0, supplier_1.validateSupplier)(data);
            if (!validationResult.success) {
                const error = new Error("Validación fallida");
                error["details"] = validationResult.error.errors;
                throw error;
            }
            const id = (0, uuid_1.v4)();
            const suppliersDb = await suppliersModel_1.default.read();
            suppliersDb.suppliers.push({ id, ...validationResult.data });
            suppliersModel_1.default.write(suppliersDb);
            return id;
        }
        catch (error) {
            throw error;
        }
    }
    static async read(where) {
        try {
            const { suppliers } = await suppliersModel_1.default.read();
            if (!where || Object.keys(where).length === 0) {
                //si no hay querys devuelvo lista completa
                return suppliers;
            }
            const filteredSuppliers = suppliers.filter((supplier) => supplier.name.includes(where.name));
            return filteredSuppliers;
        }
        catch (error) {
            throw error;
        }
    }
    static async update(id, data) {
        try {
            const validationResult = (0, supplier_1.validateUpdateSupplier)(data);
            if (!validationResult.success) {
                const error = new Error("Validación fallida");
                error["details"] = validationResult.error.errors;
                throw error;
            }
            const suppliersDb = await suppliersModel_1.default.read();
            const updatedSuppliers = suppliersDb.suppliers.map((supplier) => supplier.id === id
                ? { ...supplier, ...validationResult.data }
                : supplier);
            suppliersDb.suppliers = updatedSuppliers;
            suppliersModel_1.default.write(suppliersDb);
            return id;
        }
        catch (error) {
            throw error;
        }
    }
    static async deleteById(id) {
        try {
            const suppliersDb = await suppliersModel_1.default.read();
            const suppliers = suppliersDb.suppliers.filter((supplier) => supplier.id != id);
            if (suppliersDb.suppliers.length == suppliers.length) {
                const error = new Error("Insumo no encontrado");
                error["statusCode"] = 404;
                throw error;
            }
            suppliersDb.suppliers = suppliers;
            await suppliersModel_1.default.write(suppliersDb);
            return id;
        }
        catch (error) {
            throw error;
        }
    }
    static async getById(id) {
        try {
            const { suppliers } = await suppliersModel_1.default.read();
            const supplier = suppliers.find((supplier) => supplier.id === id);
            if (!supplier) {
                const error = new Error("Insumo no encontrado");
                error["statusCode"] = 404;
                throw error;
            }
            return supplier;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = SuppliersService;
