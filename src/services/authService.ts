import AuthModel from "../models/authModel";
import createHash from "../utils/createHash";
import { v4 as uuidv4 } from "uuid";
import UsersService from "./usersService";

class AuthService {
  static async register(data: {
    name: string;
    email: string;
    password: string;
  }) {
    const { name, email, password } = data;
    try {
      const userId = await UsersService.create({ name, email });
      const authDb = await AuthModel.read();
      const token = createHash(uuidv4());
      authDb.auth.push({
        id: uuidv4(),
        userId,
        password: createHash(password),
        token,
      });
      AuthModel.write(authDb);
      return token;
    } catch (error) {
      throw error;
    }
  }

  static async login(data: { email: string; password: string }) {
    const { email, password } = data;
    try {
      const user = await UsersService.getByEmail(email);
      const userAuth = await AuthService.getByUserId(user.id);
      if (userAuth.password != createHash(password)) {
        const error = new Error("La contrasenia es incorrecta");
        error["statusCode"] = 400;
        throw error;
      }
      return userAuth.token;
    } catch (error) {
      throw error;
    }
  }

  static async logout(token) {
    try {
      const authDb = await AuthModel.read();
      const auth = authDb.auth.find((auth) => auth.token == token);

      if (!auth) {
        const error = new Error("token no encontrado");
        error["statusCode"] = 404;

        throw error;
      }

      auth.token = null;

      await AuthModel.write(authDb);
    } catch (error) {
      throw error;
    }
  }

  static async getByUserId(id: string) {
    try {
      const authDb = await AuthModel.read();
      const user = authDb.auth.find((user) => user.userId === id);
      if (!user) {
        const error = new Error("Usuario no encontrado");
        error["statusCode"] = 404;
        throw error;
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
