import { Message, Embed, EmbedBuilder, ColorResolvable, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass.js";
import ytVideo from "../../classes/ytVideo.js";
import textBlock from "../../utility/embeds/textBlock.js";
import getYTLinksFromQuery from "../../utility/getYTLinksFromQuery.js";

import youtubesearchapi from 'youtube-search-api'
import defaultColor from "../../utility/embeds/defaultColor.js";

/*
@yt.errorCheck([
    yt.MISSING_ARGS_ERR_METACLASS(2)
])
*/
export default class yt extends CommandClass {

    protected static commandCategory: string = 'misc'
    protected static commandDescription: string = 'Outputs search results for a youtube search'
    protected static commandSyntax: string = 'yt <query>'


    public static slashCommand = new SlashCommandBuilder()
    .setName("yt")
    .setDescription("Searches youtube")
    .addStringOption(query =>
        query.setDescription("The query for youtube")
        .setName("query")
        .setRequired(true)
    )



    public async commandMain(interaction: ChatInputCommandInteraction, client: Tau): Promise<void> {
        const query = interaction.options.getString('query')
        const links: ytVideo[] = await getYTLinksFromQuery(query)
        let embed = new EmbedBuilder()
        .setTitle(textBlock(`Search results for ${query}`))
        .setColor(defaultColor)
        for (let i = 0; i < links.length; i++) {
            embed.addFields({
                name: textBlock(`Result ${i + 1}: ${links[i].title}`),
                value: links[i].URL,
                inline:false
            })
        }
        interaction.reply({embeds: [embed]})
    }
    
}