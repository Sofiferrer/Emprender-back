export interface User {
  id: string;
  email: string;
  name: string;
  brand: string;
  picture: string;
}

export interface AuthUser {
  id: string;
  userId: string;
  password: string;
  token: string;
}
