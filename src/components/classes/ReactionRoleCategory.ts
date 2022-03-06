import { TextChannel, MessageEmbed, Message, GuildMember, User, Role, ReactionCollector } from "discord.js";
import Tau from "../..";
import selfRoles from "../qt/selfRoles";
import qt from "../qt/qt data";
import defaultColor from "../utility/embeds/defaultColor";


/*
Whenever a role is added to a member, all other reaction
roles are removed from the user. This is a bug.
*/
export default class ReactionRoleCategory {
    public name: string
    public roles: string[]
    public oneRoleOnly: boolean
    constructor(name: string, roles: string[], oneRoleOnly: boolean) {
        this.name = name;
        this.roles = roles;
        this.oneRoleOnly = true; // temporary
    }

    async printReactionRoleMessages(client: Tau) {
        
        const server = client.guilds.cache.get(qt.id)
        const channel: TextChannel = client.channels.cache.get(qt.channels['roles']) as TextChannel
        const categoryEmbed: MessageEmbed = new MessageEmbed()
            .setTitle(this.name)
            .setColor(defaultColor)
            //.setDescription(`React to the messages below to get a ${this.name} role!`);
    
        channel.send({embeds: [categoryEmbed]})
            for(let i = 0; i < this.roles.length; i++) {
        const id = this.roles[i]
        const role = server.roles.cache.get(id)
        const embed: MessageEmbed = new MessageEmbed()
            .setTitle(`${role.name}`)
            //.setDescription(`React to get ${role.name}`)
            .setColor(role.color)

        const sentMessage: Message = await channel.send({embeds: [embed]})
        sentMessage.react('✅')
        const collector: ReactionCollector = sentMessage.createReactionCollector()

        
        collector.on('collect', (reaction, user) => {
            console.log(reaction)
            console.log(user.id)
            this.handleMessageReactionEvent(client, reaction, user, sentMessage, channel, role)
        })

        /*
        // event listeners for handling message reaction events
        client.on('messageReactionAdd', (reactionp, user) => {
            
        })

        client.on('messageReactionRemove', (reactionp, user) => {
            this.handleMessageReactionEvent(client, reactionp, user, sentMessage, channel, role)
        })
        */
        
        
        

        
        
    }
    }


    private handleMessageReactionEvent(client: Tau, reactionp: any, user: User, sentMessage: Message, channel: TextChannel, role: Role) {
        // whenever a reaction is added or removed in a reaction role message, it will run
        if (user.id == client.user.id) return
        if (reactionp.message.id != sentMessage.id) return // only perform this action if the message is the one we sent for this role
            // remove all other roles in this category
            const member: GuildMember = channel.guild.members.cache.get(user.id)
            this.roles.forEach(role => {
                console.log(channel.guild.roles.cache.get(role).name)
                if (member.roles.cache.has(role)) {
                member.roles.remove(role)
                }
            })
            // get the member object from the user
            
            if (member == null) return
            
            if (reactionp.message.id == sentMessage.id) {
                member.roles.add(role)
            }
    }


}