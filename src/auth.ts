import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        GitHub,
        Google,
        Credentials({
            id: 'demo',
            name: 'Demo',
            credentials: {},
            authorize: async () => {
                return {email: 'demo@reading-tracker.app', name: 'Demo User'};
            },
        }),
    ],
});
