import { GuildMember, Message, Embed } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass";
import allColors from "../../qt/colors";
import qtData from "../../qt/qt data";



const reactionRoles = {

}



/**
One bug with this is it doesn't work if the bot restarts
This is because the event listener stops working after the bot restarts

*/


export default class colorreaction extends CommandClass {

    protected static commandCategory: string = 'staff'
    protected static commandDescription: string = 'Prints reaction roles'
    protected static commandSyntax: string = 'reactionRoles'

    public async commandMain(message: Message<boolean>, client: Tau): Promise<void> {
        const redEmbed = new Embed()
            .setColor('#ff0000')
            .setTitle('Red')
            .setDescription('React to get the Red role.')
        
        const redMessage: Message = await message.channel.send({embeds: [redEmbed]})

        const orangeEmbed = new Embed()
            .setColor('ORANGE')
            .setTitle('Orange')
            .setDescription('React to get the Orange role.')
        
        const orangeMessage: Message = await message.channel.send({embeds: [orangeEmbed]})

        const yellowEmbed = new Embed()
            .setColor('YELLOW')
            .setTitle('Yellow')
            .setDescription('React to get the Yellow role.')
        
        const yellowMessage: Message = await message.channel.send({embeds: [yellowEmbed]})


        const greenEmbed = new Embed()
            .setColor('GREEN')
            .setTitle('Green')
            .setDescription('React to get the Green role.')
        
        const greenMessage: Message = await message.channel.send({embeds: [greenEmbed]})

        const blueEmbed = new Embed()
            .setColor('BLUE')
            .setTitle('Blue')
            .setDescription('React to get the Blue role.')
        
        const blueMessage: Message = await message.channel.send({embeds: [blueEmbed]})


        const purpleEmbed = new Embed()
            .setColor('PURPLE')
            .setTitle('Purple')
            .setDescription('React to get the Purple role.')
        
        const purpleMessage: Message = await message.channel.send({embeds: [purpleEmbed]})


        const pinkEmbed = new Embed()
            .setColor('#fcb2c5')
            .setTitle('Pink')
            .setDescription('React to get the Pink role.')
        
        const pinkMessage: Message = await message.channel.send({embeds: [pinkEmbed]})

        client.on('messageReactionAdd', (reactionp, user) => {
            // get the member object from the user
            const member: GuildMember = message.guild.members.cache.get(user.id)
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
            const member: GuildMember = message.guild.members.cache.get(user.id)
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
        
    }

    static addReaction(member: GuildMember, color: string) {
        let colors = allColors['standard']

        if (member.roles.cache.has(qtData.roles['Administrator'])) {
            colors = allColors['admin']
        }
        else if (member.roles.cache.has(qtData.roles['Moderator'])) {
            colors = allColors['mod']
        }

        // remove all color roles from the member
        Object.keys(allColors['standard']).forEach(color => {
            if (member.roles.cache.has(colors[color])) {
            member.roles.remove(colors[color])
            }
        })

        Object.keys(allColors['mod']).forEach(color => {
            if (member.roles.cache.has(colors[color])) {
            member.roles.remove(colors[color])
            }
        })

        Object.keys(allColors['admin']).forEach(color => {
            if (member.roles.cache.has(colors[color])) {
            member.roles.remove(colors[color])
            }
        })

        // add the new color role
        member.roles.add(colors[color])

    }
    
}