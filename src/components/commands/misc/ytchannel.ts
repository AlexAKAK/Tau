import { Message, MessageEmbed } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass";
import ytChannel from "../../classes/ytChannel";
import defaultColor from "../../utility/embeds/defaultColor";
import getYTChannelFromQuery from "../../utility/getYTChannelFromQuery";

@ytchannel.errorCheck([
    ytchannel.MISSING_ARGS_ERR_METACLASS(2)
])

export default class ytchannel extends CommandClass {
    protected static commandCategory: string = 'misc'
    protected static commandDescription: string = 'Displays a Youtube channel'
    protected static commandSyntax: string = 'ytchannel <query>'



    public async commandMain(message: Message, client: Tau): Promise<any> {
        const query: string = ytchannel.removePrefixAndCommandFromString(message.content, client.PREFIX)
        const channel: ytChannel = await getYTChannelFromQuery(query)
        if (channel == null) ytchannel.sendErrMessage(message.channel, `There are no channel results for: ${query}`)
        else {
            let embed = new MessageEmbed()
            embed.setTitle(`Result for: ${query}`)
            embed.addField(`\`\`\`Channel name\`\`\``, `\`\`\`${channel.name}\`\`\``, false)
            embed.addField('\`\`\`URL\`\`\`', `\`\`\`${channel.URL}\`\`\``, false)
            embed.setURL(channel.URL)
            embed.setThumbnail(`https:${channel.thumbnail['thumbnails'][1]['url']}`)
            embed.setTimestamp()
            embed.setColor(defaultColor)
            message.channel.send(embed)
        }
    }
    
}