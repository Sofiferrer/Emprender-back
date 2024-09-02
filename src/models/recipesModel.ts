import path from "path";
import { writeFile, readFile } from "jsonfile";

class RecipesModel {
  static getFilePath() {
    return path.join(__dirname, "../database/recipes.json");
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

export default RecipesModel;
