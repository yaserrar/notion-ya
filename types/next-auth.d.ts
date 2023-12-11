import { User } from "@prisma/client";
import NextAuth from "next-auth";

export type SessionUser = Omit<User, "password">;

declare module "next-auth" {
  interface Session {
    user?: SessionUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: SessionUser;
  }
}
