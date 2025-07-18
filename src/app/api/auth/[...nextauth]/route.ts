import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

callbacks: {
  async session({ session, token }: { session: Session; token: JWT }) {
    if (session?.user) {
      session.user.id = token.sub!;
    }
    return session;
  },
}


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
