import { Guild, Message, MessageEmbed } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass";
import defaultColor from "../../utility/embeds/defaultColor";


@announce.alias(['a'])
@announce.memberCooldown(60000)
@announce.errorCheck([announce.MISSING_ARGS_ERR_2])
export default class announce extends CommandClass {
    protected static commandCategory: string = 'misc'
    protected static commandDescription: string = 'You make an announcement'
    protected static commandSyntax: string = 'announce <message>'


    static MISSING_ARGS_ERR_2 = announce.MISSING_ARGS_ERR_METACLASS(2)


    async commandMain(message: Message, client: Tau): Promise<void> {
        const spaceIndex: number = message.content.indexOf(' ')
        const msg = message.content.substring(spaceIndex + 1)

    
        const embed = new MessageEmbed()
        .setColor(defaultColor)
        .setDescription(msg)
        .setTitle(`Annoucement by ${message.author.tag}`)
        .setTimestamp()

        message.channel.send(embed)

        if (!message.deleted) message.delete()

   
    }
}
