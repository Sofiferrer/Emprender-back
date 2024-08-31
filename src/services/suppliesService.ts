import { v4 as uuidv4 } from "uuid";
import SuppliesModel from "../models/suppliesModel";
import { Supply } from "../schemas/supply";

class SuppliesService {
  static async create(data: Supply) {
    try {
      const id = uuidv4();
      const suppliesDb = await SuppliesModel.read();
      suppliesDb.supplies.push({ id, ...data });
      SuppliesModel.write(suppliesDb);
      return id;
    } catch (error) {
      throw error;
    }
  }

  static async read(where) {
    try {
      const { supplies } = await SuppliesModel.read();

      if (!where || Object.keys(where).length === 0) {
        return supplies;
      }

      const filteredSupplies = supplies.filter((supply) =>
        supply.name.includes(where.name)
      );

      return filteredSupplies;
    } catch (error) {
      throw error;
    }
  }

  static async update(id: string, data: Supply) {
    try {
      const suppliesDb = await SuppliesModel.read();
      const updatedSupplies = suppliesDb.supplies.map((supply: Supply) =>
        supply.id === id ? { ...supply, ...data } : supply
      );

      suppliesDb.supplies = updatedSupplies;
      SuppliesModel.write(suppliesDb);
      return id;
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(id: string) {
    try {
      const suppliesDb = await SuppliesModel.read();

      const supplies = suppliesDb.supplies.filter(
        (supply: Supply) => supply.id != id
      );

      if (suppliesDb.supplies.length == supplies.length) {
        const error = new Error("Insumo no encontrado");
        error["statusCode"] = 404;

        throw error;
      }

      suppliesDb.supplies = supplies;

      await SuppliesModel.write(suppliesDb);
      return id;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id: string) {
    try {
      const { supplies } = await SuppliesModel.read();

      const supply = supplies.find((supply) => supply.id === id);

      if (!supply) {
        const error = new Error("Insumo no encontrado");
        error["statusCode"] = 404;

        throw error;
      }

      return supply;
    } catch (error) {
      throw error;
    }
  }
}

export default SuppliesService;
