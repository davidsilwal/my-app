import type { NextAuthOptions } from "next-auth";
import { OAuthConfig } from "next-auth/providers/oauth";


const clickUpProvider: OAuthConfig<any> = {
    id: "openiddict",
    name: "openiddict",
    type: "oauth",
    version: "2.0",
    // scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    // params: { grant_type: "authorization_code" },
    accessTokenUrl: "http://13.127.98.110:6001/connect/token",
    requestTokenUrl: "http://13.127.98.110:6001/connect/token",
    // authorizationUrl: "https://accounts.google.com/o/oauth2/auth?response_type=code",
    profileUrl: "http://13.127.98.110:6001/connect/userinfo",
    async profile(profile, tokens) {
        // You can use the tokens, in case you want to fetch more profile information
        // For example several OAuth providers do not return email by default.
        // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
        return {
            id: profile.id,
            name: profile.name,
            email: profile.email
        }
    },
    clientId: "auth-server",
    clientSecret: "499D56FA-B47B-5199-BA61-B298D431C318"
}


// Define authentication options using NextAuthOptions interface
export const authOptions: NextAuthOptions = {
    // Customize authentication pages
    pages: {
        signIn: "/login", // Redirect users to "/login" when signing in
    },
    // Configure session management
    session: {
        strategy: "jwt", // Use JSON Web Tokens (JWT) for session management
    },
    // Configure authentication providers
    providers: [
        clickUpProvider
    ],
};