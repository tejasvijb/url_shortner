export type JwtUserPayload = PersistedUser;

export interface LoginUserBody {
  email: string;
  password: string;
}

export interface PersistedUser {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  role: UserRole;
}

export interface RegisterUserBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: UserRole;
}

export type UserRole = "admin" | "user";
