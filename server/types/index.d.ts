export {};

// express-session declaration merging
declare module 'express-session' {
  interface SessionData {
    user: { email: string; userID: string };
  }
}
