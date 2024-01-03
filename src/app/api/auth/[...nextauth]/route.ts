import NextAuth from "next-auth"

// importing providers

import GoogleProvider from "next-auth/providers/google";
import { UserModel } from "../../../../../server/src";

const handler = NextAuth({
    providers: [
       
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          })
    ],
    callbacks: {
            // async signIn(params) {
            //         const { user } = params;
            //         const { email, name, image } = user;
                    
            //         await UserModel.findOneAndUpdate(
            //             { email },
            //             { name, email, image },
            //             { upsert: true }
            //         );
        
            //         return true;
            //     },
    }
})

export { handler as GET, handler as POST }