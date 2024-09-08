import { v4 as uuidv4 } from "uuid";
import UsersModel from "../models/usersModel";

class UsersService {
  static async create(data: { name: string; email: string }) {
    const { name, email } = data;
    try {
      const id = uuidv4();
      const usersDb = await UsersModel.read();
      usersDb.users.push({ name, email, id });
      UsersModel.write(usersDb);
      return id;
    } catch (error) {
      throw error;
    }
  }

  static async read() {
    try {
      const users = await UsersModel.read();
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async getByEmail(email: string) {
    try {
      const usersDb = await UsersService.read();
      const user = usersDb.users.find((user) => user.email === email);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UsersService;
