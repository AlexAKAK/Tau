import { Guild, GuildMember, Message, MessageEmbed, ReactionCollector, TextChannel, User, VoiceChannel } from "discord.js";
import Tau from "../..";
import color from "../commands/misc/color";
import colorreaction from "../commands/staff/colorreaction";
import qtData from "./qt data";
import defaultRoles from './../qt/events/defaultRoles';
import qt from './qt data'
//import selfRoles from "./selfRoles";
const selfRoles = require('./../../../data/selfRoles')
import ReactionRoleCategory from "../classes/ReactionRoleCategory";

export default async function setup (client: Tau): Promise<void> {
    /*
    This function runs whenever the bot goes online. 
    It is used to setup anything specific to the qt server.
    */
    await addDefaultRoles(client)
    await colors(client)
    await addSelfRoles(client)
    await memberCountUpdate(client)
}

async function addDefaultRoles(client: Tau) {
    const server: Guild = client.guilds.cache.get(qt.id)
    server.members.cache.forEach(member => {
        for (let i = 0; i < defaultRoles.length; i++) {
            if (!member.roles.cache.has((defaultRoles[i]))) {
                member.roles.add((defaultRoles[i]))
            }
        }

        
    })
}


async function colors(client: Tau) {




    const channel: TextChannel = client.channels.cache.get(qt.channels['roles']) as TextChannel

    // delete all message in the channel
    const messages = await channel.messages.fetch({ limit: 100 })
    await channel.bulkDelete(messages)
    

    const redEmbed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Red')
            .setDescription('React to get the Red role.')
        
        const redMessage: Message = await channel.send({embeds: [redEmbed]})
        redMessage.createReactionCollector()
        .on('collect', (reaction, user: User) => {
            const member: GuildMember = channel.guild.members.cache.get(user.id)
            colorreaction.addReaction(member, 'red')
        })
        
        const orangeEmbed = new MessageEmbed()
            .setColor('ORANGE')
            .setTitle('Orange')
            .setDescription('React to get the Orange role.')
        
        const orangeMessage: Message = await channel.send({embeds: [orangeEmbed]})
        orangeMessage.createReactionCollector()
        .on('collect', (reaction, user: GuildMember) => {
            const member: GuildMember = channel.guild.members.cache.get(user.id)
            colorreaction.addReaction(member, 'orange')
        })
        const yellowEmbed = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle('Yellow')
            .setDescription('React to get the Yellow role.')
        
        const yellowMessage: Message = await channel.send({embeds: [yellowEmbed]})
        yellowMessage.createReactionCollector()
        .on('collect', (reaction, user: GuildMember) => {
            const member: GuildMember = channel.guild.members.cache.get(user.id)
            colorreaction.addReaction(member, 'yellow')
        })

        const greenEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Green')
            .setDescription('React to get the Green role.')
        
        const greenMessage: Message = await channel.send({embeds: [greenEmbed]})
        greenMessage.createReactionCollector()
        .on('collect', (reaction, user: GuildMember) => {
            const member: GuildMember = channel.guild.members.cache.get(user.id)
            colorreaction.addReaction(member, 'green')
        })
        const blueEmbed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle('Blue')
            .setDescription('React to get the Blue role.')
        
        const blueMessage: Message = await channel.send({embeds: [blueEmbed]})
        blueMessage.createReactionCollector()
        .on('collect', (reaction, user: GuildMember) => {
            const member: GuildMember = channel.guild.members.cache.get(user.id)
            colorreaction.addReaction(member, 'blue')
        })

        const purpleEmbed = new MessageEmbed()
            .setColor('PURPLE')
            .setTitle('Purple')
            .setDescription('React to get the Purple role.')
        
        const purpleMessage: Message = await channel.send({embeds: [purpleEmbed]})
        purpleMessage.createReactionCollector()
        .on('collect', (reaction, user: GuildMember) => {
            const member: GuildMember = channel.guild.members.cache.get(user.id)
            colorreaction.addReaction(member, 'purple')
        })

        const pinkEmbed = new MessageEmbed()
            .setColor('#fcb2c5')
            .setTitle('Pink')
            .setDescription('React to get the Pink role.')
        
        const pinkMessage: Message = await channel.send({embeds: [pinkEmbed]})
        pinkMessage.createReactionCollector()
        .on('collect', (reaction, user: GuildMember) => {
            const member: GuildMember = channel.guild.members.cache.get(user.id)
            colorreaction.addReaction(member, 'pink')
        })
        /*
        client.on('messageReactionAdd', (reactionp, user) => {
            // get the member object from the user
            const member: GuildMember = channel.guild.members.cache.get(user.id)
            if (member == null) return
            if (reactionp.message.id == redMessage.id)
            colorreaction.addReaction(member, 'red')
            if (reactionp.message.id == orangeMessage.id) 
            colorreaction.addReaction(member, 'orange')
            if (reactionp.message.id == yellowMessage.id) 
            colorreaction.addReaction(member, 'yellow')
            if (reactionp.message.id == greenMessage.id) 
            colorreaction.addReaction(member, 'green')
            if (reactionp.message.id == blueMessage.id) 
            colorreaction.addReaction(member, 'blue')
            if (reactionp.message.id == purpleMessage.id) 
            colorreaction.addReaction(member, 'purple')
            if (reactionp.message.id == pinkMessage.id) 
            colorreaction.addReaction(member, 'pink')
                
        })

        client.on('messageReactionRemove', (reactionp, user) => {
            // get the member object from the user
            const member: GuildMember = channel.guild.members.cache.get(user.id)
            if (member == null) return
            if (reactionp.message.id == redMessage.id)
            colorreaction.addReaction(member, 'red')
            if (reactionp.message.id == orangeMessage.id) 
            colorreaction.addReaction(member, 'orange')
            if (reactionp.message.id == yellowMessage.id) 
            colorreaction.addReaction(member, 'yellow')
            if (reactionp.message.id == greenMessage.id) 
            colorreaction.addReaction(member, 'green')
            if (reactionp.message.id == blueMessage.id) 
            colorreaction.addReaction(member, 'blue')
            if (reactionp.message.id == purpleMessage.id) 
            colorreaction.addReaction(member, 'purple')
            if (reactionp.message.id == pinkMessage.id) 
            colorreaction.addReaction(member, 'pink')
        })
        */
}


async function addSelfRoles(client: Tau) {
    const server = client.guilds.cache.get(qt.id)
    const channel: TextChannel = client.channels.cache.get(qt.channels['roles']) as TextChannel

    for(let i = 0; i < Object.keys(selfRoles).length; i++) {
        const category: ReactionRoleCategory = new ReactionRoleCategory(Object.keys(selfRoles)[i], selfRoles[Object.keys(selfRoles)[i]])
        await category.printReactionRoleMessages(client)
    }


    

}



async function memberCountUpdate(client: Tau) {
    const channel: VoiceChannel = client.channels.cache.get(qt.channels['memberCount']) as VoiceChannel
    console.log(channel.name)
    channel.setName(`😃Members: ${channel.guild.members.cache.size}`)
    setInterval(async () => {
        channel.setName(`😃Members: ${channel.guild.members.cache.size}`)
    }, 1000 * 60 * 60)
    
}
