import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { isPasswordValid } from "./lib/auth";
import db from "./lib/db";
import User from "./models/User"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
	Credentials({
		name: "Email",
		credentials: {
			email: { label: "Email", type: "email " },
			password: { label: "Password", type: "password" },
		},
		authorize: async ({email,password}) => {

			await db.connect();

			let user = await User.findOne({email});

			console.log(user);

			if(!user) return null;

			let isValid = await isPasswordValid(password as string, user.password);

			console.log(isValid);

			if(!isValid) return null;

			return {
				id: user.id,
				name: user.name,
				role: user.role,
				email: user.email
			};
		},
	  }),
  ],
  callbacks: {
	jwt({token,user}) {
		if(user) {
			token.role = user.role;
		}
		return token;
	},
	session({ session, token }) {
		session.user.role = token.role
		return session
	  },  
  }
})