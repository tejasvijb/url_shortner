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

// ============= SHORT URL TYPES =============

// Short URL request body types
export type CreateShortUrlRequestBody = {
    originalUrl: string;
    customAlias?: string;
    expiresAt?: string;
    description?: string;
    tags?: string[];
};

export type UpdateShortUrlRequestBody = {
    customAlias?: string;
    description?: string;
    expiresAt?: string;
    tags?: string[];
};

// Short URL response types
export type ShortUrlInfo = {
    id: string;
    shortCode: string;
    originalUrl: string;
    customAlias?: string;
    clickCount: number;
    lastClickedAt?: Date;
    isActive: boolean;
    description?: string;
    tags?: string[];
    expiresAt?: Date;
    createdAt: Date;
};

export type RedirectShortUrlAPIResponse = {
    originalUrl: string;
};

export type CreateShortUrlAPIResponse = ShortUrlInfo;

export type UpdateShortUrlAPIResponse = ShortUrlInfo;

export type GetUrlInfoAPIResponse = ShortUrlInfo;

export type GetUrlAnalyticsAPIResponse = {
    shortCode: string;
    customAlias?: string;
    clickCount: number;
    lastClicked?: Date;
};

export type GetUserUrlsAPIResponse = {
    data: ShortUrlInfo[];
    pagination: {
        currentPage: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export type GetGlobalUrlAnalyticsAPIResponse = {
    totalUrls: number;
    totalClicks: number;
};

export type DeleteShortUrlAPIResponse = {
    message: string;
};

// Error response type
export type ShortUrlErrorResponse = {
    error: string;
};
