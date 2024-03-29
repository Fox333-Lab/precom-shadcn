import NextAuth, { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      uid: string;
      role: string;
    } & DefaultSession["user"];
  }
}
