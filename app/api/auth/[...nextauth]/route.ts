// route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

interface Auth0Profile {
    sub: string;
    name: string;
    email: string;
    picture: string;
    "https://omerkarakas.com/roles"?: string[];
}

const authOptions: NextAuthOptions = {
    providers: [
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID!,
            clientSecret: process.env.AUTH0_CLIENT_SECRET!,
            issuer: process.env.AUTH0_ISSUER,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            // İlk giriş sırasında user bilgilerini token'a ekle
            if (user) {
                token.roles = user.roles || [];
            }
            return token;
        },
        async session({ session, token }) {
            // JWT'den session'a rolleri aktar
            if (session.user) {
                session.user.id = token.sub!;
                session.user.roles = token.roles || [];
            }
            return session;
        },
        async signIn({ user, account, profile }) {
            // Auth0'dan gelen custom claims'leri işle
            if (account?.provider === "auth0" && profile) {
                // Auth0'da custom claim'ler namespace ile gelir
                const auth0Profile = profile as Auth0Profile;
                const roles = auth0Profile["https://omerkarakas.com/roles"] || [];
                user.roles = roles;
            }
            return true;
        },
    },
    pages: {
        signIn: "/",
        error: "/auth/error",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
