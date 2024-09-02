"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const suppliesModel_1 = __importDefault(require("../models/suppliesModel"));
const supply_1 = require("../schemas/supply");
class SuppliesService {
  static async read() {
    try {
      const supplies = await suppliesModel_1.default.read();
      return supplies;
    } catch (error) {
      throw error;
    }
  }
  static async create(data) {
    const validationResult = (0, supply_1.validateSupply)(data);
    if (!validationResult.success) {
      const error = new Error(`${validationResult.error.format()}`);
      error["statusCode"] = 400;
      throw error;
    }
    try {
      const id = (0, uuid_1.v4)();
      const suppliesDb = await suppliesModel_1.default.read();
      suppliesDb.supplies.push({ id, ...validationResult.data });
      suppliesModel_1.default.write(suppliesDb);
      return id;
    } catch (error) {
      throw error;
    }
  }
}
exports.default = SuppliesService;
