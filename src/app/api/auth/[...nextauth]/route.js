import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

const handler = NextAuth({
  
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
       clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  // theme : {
  //   logo : "https://papareact.com/sq0",
  //   brandColor : "#F13287",
  //   colorScheme : "auto"
  // }
  pages : {
    signIn : "/auth/signin"
  },
  callbacks : {
    async session({ session, token, user }) {
      session.user.username = session.user.name.split(" ").join("").toLowerCase();
      session.user.uid = token.sub;
      return session;
    }
  }
})

export { handler as GET, handler as POST }