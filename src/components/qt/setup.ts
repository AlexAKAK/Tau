import { Guild } from "discord.js";
import Tau from "../..";

import qt from './qt data'

export default function setup (client: Tau) {
    const server: Guild = client.guilds.cache.get(qt.id)
    server.members.cache.forEach(member => {
        console.log(member.displayName)
        if (!member.roles.cache.has(server.roles.cache.get(qt.roles['Member']).id)) {
            member.roles.add(server.roles.cache.get(qt.roles['Member']))
        }
    })
}