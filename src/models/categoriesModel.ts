import path from "path";
import { writeFile, readFile } from "jsonfile";

class CategoriesModel {
  static getFilePath() {
    return path.join(__dirname, "../database/categories.json");
  }

  static async read() {
    try {
      return await readFile(this.getFilePath());
    } catch (error) {
      console.error("Error reading file:", error);
      throw error;
    }
  }

  static async write(data) {
    try {
      await writeFile(this.getFilePath(), data);
      return true;
    } catch (error) {
      console.error("Error writing file:", error);
      throw error;
    }
  }
}

export default CategoriesModel;
