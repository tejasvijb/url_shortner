// types/express.d.ts
import type { JwtUserPayload } from "../user.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtUserPayload;
    }
  }
}

export {};
