import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db"
import { compare } from "bcrypt"




export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/sign-in', // our custom page
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "alice@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials.password) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: {email: credentials?.email}
        });
        if(!existingUser) { return null; }

        const isPasswordMatch = await compare(credentials.password, existingUser.password);
        if(!isPasswordMatch) { return null; }

        return {
          id: existingUser.id,
          username: existingUser.username,
          email: existingUser.email
        }
      }
    })
  ],


  callbacks: {
    async jwt({ token, user}) {
      console.log("ℹ️ TOKEN from authOptions in [...nextauth]route.ts", token);
      console.log("---------");
      if(user) {
        return {
          ...token,
          username: user.username
        }
      }
      return token
    },
    async session({session, token}) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username
        }
      }
    }
  }
}


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
