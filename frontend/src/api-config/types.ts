// User role types
export type UserRole = "admin" | "user";

// User type from backend (persisted user)
export type PersistedUser = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
};

// Request body types
export type LoginRequestBody = {
    email: string;
    password: string;
};

export type RegisterRequestBody = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role?: UserRole;
};

export type UserWithoutConfirmPassword = Omit<
    RegisterRequestBody,
    "password"
> & {
    password: string;
};

// Response types
export type LoginInfoAPIResponse = {
    accessToken: string;
    user: PersistedUser;
};

export type CurrentUserAPIResponse = {
    user: PersistedUser;
};

export type RegisterInfoAPIResponse = {
    user: PersistedUser;
};

// Error response type
export type AuthErrorResponse = {
    message: string;
    title?: string;
};
