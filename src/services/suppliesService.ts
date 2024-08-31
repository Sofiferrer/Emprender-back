import { v4 as uuidv4 } from "uuid";
import SuppliesModel from "../models/suppliesModel";
import { Supply } from "../schemas/supply";

class SuppliesService {
  static async read() {
    try {
      const supplies = await SuppliesModel.read();
      return supplies;
    } catch (error) {
      throw error;
    }
  }

  static async create(data: Supply) {
    const { name, quantity, unit, category, price, supplier } = data;
    try {
      const id = uuidv4();
      const suppliesDb = await SuppliesModel.read();
      suppliesDb.supplies.push({
        id,
        name,
        quantity,
        unit,
        category,
        price,
        supplier,
      });
      SuppliesModel.write(suppliesDb);
      return id;
    } catch (error) {
      throw error;
    }
  }
}

export default SuppliesService;
