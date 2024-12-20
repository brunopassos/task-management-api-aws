export interface UserPayload {
  sub: string;
  [key: string]: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload
    }
  }
}