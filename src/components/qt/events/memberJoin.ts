import { GuildMember, Guild, TextChannel, MessageEmbed } from "discord.js"
import Tau from "../../.."
import qt from './../qt data'
import defaultColor from "../../utility/embeds/defaultColor"


export default function memberJoin (client: Tau, member: GuildMember) {
    /*
    This function runs whenever a member joins the server. 
    It is used to setup anything specific to the qt server.
    */
    const server: Guild = client.guilds.cache.get(qt.id)
    const channel: TextChannel = server.channels.cache.get(qt.channels.welcome) as TextChannel
    member.roles.add(server.roles.cache.get(qt.roles['Member']))

  
    const embed = new MessageEmbed()
    embed.setTitle(`${member.displayName} Joined the server!`)
    embed.setDescription(`<@${member.user.id}> Welcome to the server!\n\nPlease read the rules and guidelines in <#${qt.channels.rules}>`)
    embed.setThumbnail(member.displayAvatarURL())
    embed.setColor(defaultColor)

    channel.send({'embeds': [embed]})
  

    
}