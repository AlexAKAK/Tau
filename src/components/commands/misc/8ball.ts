import { DMChannel, Message, Embed, TextChannel } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass.js";
import defaultColor from "../../utility/embeds/defaultColor.js";
import fetch from "node-fetch"

@ball.alias([
    '8ball'
])

@ball.errorCheck([
    ball.MISSING_ARGS_ERR_2
])
export default class ball extends CommandClass {
    protected static commandCategory: string = 'misc'
    protected static commandDescription: string = 'Answers a question'
    protected static commandSyntax: string = '8ball <prompt>'

    protected static MISSING_ARGS_ERR_2 = ball.MISSING_ARGS_ERR_METACLASS(2)


    async commandMain(message: Message, client: Tau): Promise<void> {

        const spaceIndex: number = message.content.indexOf(' ')
        const question: string = message.content.substring(spaceIndex + 1)
        
        let params = encodeURIComponent(question);
        let url = "https://8ball.delegator.com/magic/JSON/1" + params;

        const res: Response = await fetch(url)
        
        const resJson: object = await res.json()
        console.log(resJson)
        const response: string = resJson['magic']['answer']

        //console.log(Object.keys(response))

        
        const embed = new Embed();

        embed
        .setTitle('Magic 8 Ball')
        .addField('Question', question, false)
        .addField('Response', response, false)
        .setColor(defaultColor)
        .setTimestamp()
        
        message.channel.send({embeds: [embed]})
        
    }
}