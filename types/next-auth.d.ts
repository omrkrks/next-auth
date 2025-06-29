import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            roles: string[];
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        roles: string[];
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        roles: string[];
    }
} 