import { Message, Embed, TextChannel, EmbedBuilder, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass.js";
import ytChannel from "../../classes/ytChannel.js";
import defaultColor from "../../utility/embeds/defaultColor.js";
import getYTChannelFromQuery from "../../utility/getYTChannelFromQuery.js";

/*
@ytchannel.errorCheck([
    ytchannel.MISSING_ARGS_ERR_METACLASS(2)
])
*/
export default class ytchannel extends CommandClass {
    protected static commandCategory: string = 'misc'
    protected static commandDescription: string = 'Displays a Youtube channel'
    protected static commandSyntax: string = 'ytchannel <query>'


    public static slashCommand = new SlashCommandBuilder()
        .setName("ytchannel")
        .setDescription('Searches YouTube for a channel')
        .addStringOption(query => 
            query.setDescription('The channel to search for')
            .setName('query')
            .setRequired(true)
        )

    public async commandMain(interaction: ChatInputCommandInteraction, client: Tau): Promise<any> {
        const query: string = interaction.options.getString('query')
        const channel: ytChannel = await getYTChannelFromQuery(query)
        if (channel == null) interaction.reply('no results dound')
        else {
            let embed = new EmbedBuilder()
            embed.setTitle(`Result for: ${query}`)

            embed.addFields({
                name:  `\`\`\`Channel name\`\`\``,
                value: `\`\`\`${channel.name}\`\`\``,
                inline: false
            },
            {
                name: '\`\`\`URL\`\`\`',
                value: `\`\`\`${channel.URL}\`\`\``,
                inline: false
            }
            )


           
            embed.setURL(channel.URL)
            embed.setThumbnail(`https:${channel.thumbnail['thumbnails'][1]['url']}`)
            embed.setTimestamp()
            embed.setColor(defaultColor)
            interaction.reply({embeds: [embed]})
        }
    }
    
}