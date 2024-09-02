import { v4 as uuidv4 } from "uuid";
import {
  Supplier,
  validateSupplier,
  validateUpdateSupplier,
} from "../schemas/supplier";
import SuppliersModel from "../models/suppliersModel";

class SuppliersService {
  static async create(data: Supplier) {
    try {
      const validationResult = validateSupplier(data);
      if (!validationResult.success) {
        const error = new Error("Validación fallida");
        error["details"] = validationResult.error.errors;
        throw error;
      }
      const id = uuidv4();
      const suppliersDb = await SuppliersModel.read();
      suppliersDb.suppliers.push({ id, ...validationResult.data });
      SuppliersModel.write(suppliersDb);
      return id;
    } catch (error) {
      throw error;
    }
  }

  static async read(where) {
    try {
      const { suppliers } = await SuppliersModel.read();

      if (!where || Object.keys(where).length === 0) {
        //si no hay querys devuelvo lista completa
        return suppliers;
      }

      const filteredSuppliers = suppliers.filter((supplier) =>
        supplier.name.includes(where.name)
      );

      return filteredSuppliers;
    } catch (error) {
      throw error;
    }
  }

  static async update(id: string, data: Supplier) {
    try {
      const validationResult = validateUpdateSupplier(data);

      if (!validationResult.success) {
        const error = new Error("Validación fallida");
        error["details"] = validationResult.error.errors;
        throw error;
      }

      const suppliersDb = await SuppliersModel.read();
      const updatedSuppliers = suppliersDb.suppliers.map((supplier: Supplier) =>
        supplier.id === id
          ? { ...supplier, ...validationResult.data }
          : supplier
      );

      suppliersDb.suppliers = updatedSuppliers;
      SuppliersModel.write(suppliersDb);
      return id;
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(id: string) {
    try {
      const suppliersDb = await SuppliersModel.read();

      const suppliers = suppliersDb.suppliers.filter(
        (supplier: Supplier) => supplier.id != id
      );

      if (suppliersDb.suppliers.length == suppliers.length) {
        const error = new Error("Insumo no encontrado");
        error["statusCode"] = 404;

        throw error;
      }

      suppliersDb.suppliers = suppliers;

      await SuppliersModel.write(suppliersDb);
      return id;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id: string) {
    try {
      const { suppliers } = await SuppliersModel.read();

      const supplier = suppliers.find(
        (supplier: Supplier) => supplier.id === id
      );

      if (!supplier) {
        const error = new Error("Insumo no encontrado");
        error["statusCode"] = 404;

        throw error;
      }

      return supplier;
    } catch (error) {
      throw error;
    }
  }
}

export default SuppliersService;
