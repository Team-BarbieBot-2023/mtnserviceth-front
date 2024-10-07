import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const response = await fetch('http://localhost:3001/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: "",
                    status: "A",
                }),
            });

            if (response.ok) {
                return true;
            } else {
                console.error('Failed to create user:', response.statusText);
                return false;
            }
        },
        async session({ session, token, user }) {
            session.user.id = token.sub;
            return session;
        },
    },
};

const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };
