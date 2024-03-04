import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import db from "@/lib/db";
import User from "@/models/db/user";
import bcrypt from "bcryptjs";
import IUser from "@/types/db/user";
import clientPromise from "@/lib/mongodb";
import type { Adapter } from "next-auth/adapters";
import { ObjectId } from "mongodb";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        await db.ConnectDB();
        const email = credentials?.email;
        const password = credentials?.password;
        console.log("credentials : email - ", email, "password - ", password);
        const user = await User.findOne({ email });
        if (user) {
          // console.log("user : ", user);
          return SignInUser({ password, user });
        } else {
          throw new Error("This email does not exist");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const iid = token.sub;
      // console.log("iid : ", iid);
      let _id = new ObjectId(iid);
      let user = await User.findById({ _id });
      // console.log("find one complete : ", user);
      session.user.uid = token.sub || user?._id.toString();
      session.user.role = user?.role || "user";
      //session.user.role = "user";
      token.role = user?.role || "user";
      return session;
      // ---- the below code was used to add custom fields to the session when not using module augmentation - starts ---
      // const sess = {
      //   ...session,
      //   user: {
      //     ...session.user,
      //     uid: token.sub || user?._id,
      //     role: user?.role || "user",
      //   },
      // };
      // console.log("sess : ", sess);
      // return sess;
      // ---- ends ----
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

const SignInUser = async ({
  password,
  user,
}: {
  password: string | undefined;
  user: IUser;
}) => {
  if (!user?.password) {
    throw new Error("Please enter your password");
  }
  console.log("[nextauth] password : ", password);
  console.log("[nextauth] user?.password : ", user?.password);
  const testPassword = await bcrypt.compare(
    password as string,
    user.password as string
  );
  console.log("[nextauth] testPassword : ", testPassword);
  if (!testPassword) {
    throw new Error("Email or password is wrong");
  }
  return user;
};

export { handler as GET, handler as POST };
