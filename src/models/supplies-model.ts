import db from "../database/supplies.json";
import { writeFileSync } from "jsonfile";

class SuppliesModel {
  constructor() {}

  getData() {
    return db;
  }

  writeData(data: {}) {
    writeFileSync("./src/database/supplies.json", data);
  }
}

const suppliesModel = new SuppliesModel();

export default suppliesModel;
