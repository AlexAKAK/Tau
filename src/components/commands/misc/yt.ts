import { Message, MessageEmbed } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from "../../classes/CommandClass";
import getYTLinksFromQuery from "../../utility/getYTLinksFromQuery";

var youtubesearchapi = require('youtube-search-api');


@yt.errorCheck([
    yt.MISSING_ARGS_ERR_METACLASS(2)
])
export default class yt extends CommandClass {

    protected static commandCategory: string = 'misc'
    protected static commandDescription: string = 'Outputs search results for a youtube search'
    protected static commandSyntax: string = 'yt <query>'

    public async commandMain(message: Message, client: HydroCarbon): Promise<any> {
        const query = yt.removePrefixFromString(message.content, client.PREFIX)
        const links = await getYTLinksFromQuery(query)
        let embed = new MessageEmbed()
        .setTitle(`Search results for ${query}`)
        .setColor('GREEN')
        for (let i = 0; i < links.length; i++) {
            embed.addField(`Result ${i + 1}: ${links[i]['title']}`, links[i], false)
        }
        message.channel.send(embed)
    }
    
}