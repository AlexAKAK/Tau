import { TextChannel, MessageEmbed, Message, GuildMember } from "discord.js";
import Tau from "../..";
import selfRoles from "../qt/selfRoles";
import qt from "../qt/qt data";

export default class ReactionRoleCategory {
    public name: string
    public roles: string[]
    constructor(name: string, roles: string[] ) {
        this.name = name;
        this.roles = roles;
    }

    async printReactionRoleMessages(client: Tau) {
        const server = client.guilds.cache.get(qt.id)
    const channel: TextChannel = client.channels.cache.get(qt.channels['roles']) as TextChannel
    for(let i = 0; i < this.roles.length; i++) {
        const id = this.roles[i]
        const role = server.roles.cache.get(id)
        const embed: MessageEmbed = new MessageEmbed()
            .setTitle(`${role.name}`)
            .setDescription(`React to get ${role.name}`)
            .setColor(role.color)

        const sentMessage: Message = await channel.send({embeds: [embed]})
        client.on('messageReactionAdd', (reactionp, user) => {
            // remove all other roles in this category
            const member: GuildMember = channel.guild.members.cache.get(user.id)
            this.roles.forEach(role => {
                if (member.roles.cache.has(role)) {
                member.roles.remove(role)
                }
            })
            // get the member object from the user
            
            if (member == null) return
            
            if (reactionp.message.id == sentMessage.id) {
                member.roles.add(role)
            }

        })

        client.on('messageReactionRemove', (reactionp, user) => {
            // get the member object from the user
            const member: GuildMember = channel.guild.members.cache.get(user.id)
            // remove all other roles in this category
            this.roles.forEach(role => {
                if (member.roles.cache.has(role)) {
                member.roles.remove(role)
                }
            })
            
            if (member == null) return
            
            if (reactionp.message.id == sentMessage.id) {
                member.roles.add(role)
            }

        })
        
        

        
        
    }
    }


}