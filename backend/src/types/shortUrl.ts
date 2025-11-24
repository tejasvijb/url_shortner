export interface AnalyticsData {
  clicksToday: number;
  lastClicked?: Date;
  totalClicks: number;
}

export interface CreateShortUrlBody {
  customAlias?: string;
  description?: string;
  expiresAt?: string;
  originalUrl: string;
  tags?: string[];
}

export interface ShortUrlResponse {
  clickCount: number;
  createdAt: Date;
  customAlias?: string;
  description?: string;
  expiresAt?: Date;
  id: string;
  isActive: boolean;
  originalUrl: string;
  shortCode: string;
  tags?: string[];
}

export interface UpdateShortUrlBody {
  customAlias?: string;
  description?: string;
  expiresAt?: string;
  tags?: string[];
}

export interface UrlAnalyticsResponse {
  lastClicked?: Date;
  shortCode: string;
  totalClicks: number;
}
