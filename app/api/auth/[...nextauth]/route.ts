import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const url = process.env.NEXTAUTH_URL || 'http://localhost:3000'
        // Add logic here to look up the user from the credentials supplied
        //const user = { id: "1", name: 'J Smith', email: 'jsmith@example.com' }
        const res = await fetch(`${url}/api/login`, {
          method:"POST",
          headers:{
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            username:credentials?.username,
            password:credentials?.password,
          })
        })
        const user = await res.json();
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null or false then the credentials will be rejected
          return null
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      }
    }),
  ],
  callbacks:{
    async jwt({token,user}){
      return {...token, ...user};
    },
    async session({session, token}){
      session.user = token as any;
      return session;
    }
  },
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST }
