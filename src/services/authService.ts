import AuthModel from "../models/authModel";
import createHash from "../utils/createHash";
import { v4 as uuidv4 } from "uuid";
import UsersService from "./usersService";
import { User, validateLoginUser, validateUser } from "../schemas/users";

class AuthService {
  static async register(data: User) {
    try {
      const validationResult = validateUser(data);
      if (!validationResult.success) {
        const error = new Error("Validación fallida");
        error["details"] = validationResult.error.errors;
        throw error;
      }

      const { name, email, password } = validationResult.data;
      //const user = await UsersService.getByEmail(email);

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

  static async login(data: User) {
    try {
      const validationResult = validateLoginUser(data);
      if (!validationResult.success) {
        const error = new Error("Validación fallida");
        error["details"] = validationResult.error.errors;
        throw error;
      }
      const { email, password } = validationResult.data;
      const authDb = await AuthModel.read();
      const user = await UsersService.getByEmail(email);
      const userAuth = await AuthService.getByUserId(user.id);

      if (!user) {
        const error = new Error("Usuario no encontrado");
        error["statusCode"] = 404;
        throw error;
      }

      if (userAuth.password != createHash(password)) {
        const error = new Error("La contrasenia es incorrecta");
        error["statusCode"] = 400;
        throw error;
      }

      const token = createHash(uuidv4());
      const updatedAuthDb = authDb.auth.map((auth) =>
        auth.userId === user.id ? { ...auth, token: token } : auth
      );
      authDb.auth = updatedAuthDb;
      await AuthModel.write(authDb);

      return token;
    } catch (error) {
      throw error;
    }
  }

  static async logout(token) {
    try {
      const authDb = await AuthModel.read();
      const authUser = authDb.auth.find((auth) => auth.token == token);

      if (!authUser) {
        const error = new Error("token no encontrado");
        error["statusCode"] = 404;

        throw error;
      }

      authUser.token = null;

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
