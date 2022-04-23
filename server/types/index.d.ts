export {};

// express-session declaration merging
declare module 'express-session' {
  interface SessionData {
    user: { [key: string]: string };
  }
}
