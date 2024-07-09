import CredentialsProvider from "next-auth/providers/credentials";

function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            authorize: async (credentials) => {

                var details = {
                    username: credentials?.email,
                    password: credentials?.password,
                    'grant_type': 'password'
                };

                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");

                const res = await fetch("http://13.127.98.110:6001/connect/token", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                        "Authorization": "Basic c3dhZ2dlcjo0OTlENTZGQS1CNDdCLTUxOTktQkE2MS1CMjk4RDQzMUMzMTg="
                    },
                    body: formBody
                });
                const user = await res.json();

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return {
                        access_token: user.access_token,
                        expires_in: user.expires_in,
                    };
                }
                // Return null if user data could not be retrieved
                return null;
            }

        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user, account }) {
            // Initial sign in
            if (account && user) {
                return {
                    access_token: account.access_token,
                    expires_at: Date.now() + account.expires_in * 1000,
                    user
                }
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < token.expires_at) {
                return token
            }

            // Access token has expired, try to update it
            // return refreshAccessToken(token)
            return token;

        },
        async session({ session, token }) {
            session.user = token.user;
            var parsed = parseJwt(token.user.access_token);

            session.user.id = parsed.sub;
            session.user.email = parsed.email;
            session.user.name = parsed.name;
            session.user.role = parsed.role;

            const res = await fetch("http://13.127.98.110:6001/connect/me",
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token.user.access_token
                    }
                });

            const permission = await res.json();
            session.user.permissions = permission.permission;

            return session
        }
    }
};