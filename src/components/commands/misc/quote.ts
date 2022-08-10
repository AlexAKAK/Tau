import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder, EmbedBuilder, IntegrationApplication } from "discord.js";
import src from "../../../index.js";
import CommandClass from "../../classes/CommandClass.js";
import defaultColor from "../../utility/embeds/defaultColor.js";

import quotes from './../../utility/quotes.json' assert {type: 'json'}

export default class quote extends CommandClass {


    public static slashCommand = new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Sends a random quote')


    async commandMain(interaction: ChatInputCommandInteraction, client: src): Promise<void> {
        const index = Math.floor(Math.random() * quotes.length)
        const quote = quotes[index]


        const embed = new EmbedBuilder()
        .setTitle('Quote')
        .addFields({
            name: 'Quote',
            value: quote['text'],
            inline: false


        },
        {
            name: 'Author',
            value: quote['author'],
            inline: false
        })
        .setColor(defaultColor)




        interaction.reply({embeds: [embed]})

    }
    
}