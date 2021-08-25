import { Message, MessageEmbed } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from "../../classes/CommandClass";
import ytChannel from "../../classes/ytChannel";
import getYTChannelFromQuery from "../../utility/getYTChannelFromQuery";

export default class ytchannel extends CommandClass {
    public async commandMain(message: Message, client: HydroCarbon): Promise<any> {
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
            embed.setColor('GREEN')
            message.channel.send(embed)
        }

    }
    
}