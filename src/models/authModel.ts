import path from "path";
import { writeFile, readFile } from "jsonfile";

class AuthModel {
  static getFilePath() {
    return path.join(__dirname, "../database/auth.json");
  }

  static async read() {
    try {
      return await readFile(this.getFilePath());
    } catch (error) {
      throw error;
    }
  }

  static async write(data) {
    try {
      await writeFile(this.getFilePath(), data);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthModel;
