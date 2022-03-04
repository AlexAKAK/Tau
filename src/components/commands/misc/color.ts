import { Message, MessageEmbed } from "discord.js";
import src from "../../..";
import CommandClass from "../../classes/CommandClass";
import qtData from "../../qt/qt data";
import errorColor from "../../utility/embeds/errorColor";



const standardColors: object = {
    red: '949119106618118194',
    orange: '949119181645815829',
    yellow: '949119224578732043',
    green: '949119256602214481',
    blue: '949119326219276308',
    purple: '949119388169170974',
    pink: '949119506020708405',
    white: '949119506020708405',
}

const modColors: object = {
    red: '949126224561700955',
    orange: '949126227929735178',
    yellow: '949126256593625158',
    green: '949126256887205908',
    blue: '949126258346827888',
    purple: '949126259584143381',
    pink: '949126722526253166',
    white: '949126261853261834',
}

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
        let colors: object = standardColors
        // if it's a mod give them the mod colors
        if (message.member.roles.cache.has(qtData.roles['Moderator'])) {
            colors = modColors
        }

        // check if the requested color exists in the object
        if (!colors[requestedColor]) {
            const embed: MessageEmbed = new MessageEmbed()
            .setColor(errorColor)
            .setTitle('Invalid Color')
            .setDescription(`The color ${requestedColor} does not exist.Please use one of the following colors: red, orange, yellow, green, blue, purple, pink, white`)
            .setTimestamp()
            // send the error embed
            message.channel.send({embeds: [embed]})
            return;
        }

       // remove all color roles from the member
       Object.keys(colors).forEach(color => {
            if (message.member.roles.cache.has(colors[color])) {
            message.member.roles.remove(colors[color])
            }
       })

        // add the requested color role to the member
        message.member.roles.add(colors[requestedColor])


        // send the success embed
        const embed: MessageEmbed = new MessageEmbed()
        .setColor(message.guild.roles.cache.get(colors[requestedColor]).color)
        .setTitle('Color Changed')
        .setDescription(`You have changed your color to ${requestedColor}`)
        .setTimestamp()
        message.channel.send({embeds: [embed]})




    }
    
}