import { Message, Embed } from "discord.js";
import src from "../../..";
import CommandClass from "../../classes/CommandClass.js";
import qtData from "../../qt/qt data.js";
import errorColor from "../../utility/embeds/errorColor.js";
import allColors from './../../qt/colors.js'




@color.errorCheck([
    color.MISSING_ARGS_ERR_2
])


export default class color extends CommandClass {
    protected static MISSING_ARGS_ERR_2: Function = color.MISSING_ARGS_ERR_METACLASS(2)

    protected static commandCategory: string = 'misc'
    protected static commandDescription: string = 'Gives you a color role'
    protected static commandSyntax: string = 'color <color>'

    public async commandMain(message: Message<boolean>, client: src): Promise<void> {
        const requestedColor = color.splitArgsWithoutCommandCall(message)[0]
        let colors: object = allColors['standard']
        // if it's a mod give them the mod colors
        if (message.member.roles.cache.has(qtData.roles['Moderator'])) {
            colors = allColors['mod']
        }

        if (message.member.roles.cache.has(qtData.roles['Administrator'])) {
            colors = allColors['admin']
        }

        // check if the requested color exists in the object
        if (!colors[requestedColor]) {
            const embed: Embed = new Embed()
            .setColor(errorColor)
            .setTitle('Invalid Color')
            .setDescription(`The color ${requestedColor} does not exist.Please use one of the following colors: red, orange, yellow, green, blue, purple, pink, white`)
            .setTimestamp()
            // send the error embed
            message.channel.send({embeds: [embed]})
            return;
        }

       // remove all color roles from the member
       Object.keys(allColors['standard']).forEach(color => {
            if (message.member.roles.cache.has(colors[color])) {
            message.member.roles.remove(colors[color])
            }
        })

        Object.keys(allColors['mod']).forEach(color => {
            if (message.member.roles.cache.has(colors[color])) {
            message.member.roles.remove(colors[color])
            }
        })

        Object.keys(allColors['admin']).forEach(color => {
            if (message.member.roles.cache.has(colors[color])) {
            message.member.roles.remove(colors[color])
            }
        })

        // add the requested color role to the member
        message.member.roles.add(colors[requestedColor])


        // send the success embed
        const embed: Embed = new Embed()
        .setColor(message.guild.roles.cache.get(colors[requestedColor]).color)
        .setTitle('Color Changed')
        .setDescription(`You have changed your color to ${requestedColor}`)
        .setTimestamp()
        message.channel.send({embeds: [embed]})




    }
    
}