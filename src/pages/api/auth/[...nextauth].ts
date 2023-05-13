import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import NexusModsProvider from './providers/nexusmods';

const OAuthProviders: NextAuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_ID!,
            clientSecret: process.env.DISCORD_SECRET!
        }),
        NexusModsProvider({
            clientId: process.env.NEXUSMODS_ID!,
            clientSecret: process.env.NEXUSMODS_SECRET!
        })     
    ]
}

export default NextAuth(OAuthProviders);