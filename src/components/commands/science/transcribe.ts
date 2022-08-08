import { DMChannel, Message, Embed, TextChannel, EmbedBuilder, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass.js";
import defaultColor from "../../utility/embeds/defaultColor.js";
import replyEmbed from "../../utility/embeds/replyEmbed.js";


/*
@transcribe.errorCheck([transcribe.MISSING_ARGS_ERR_METACLASS(2)])
*/


export default class transcribe extends CommandClass {
    protected static commandCategory: string = 'science'
    protected static commandDescription: string = 'You transcribe an RNA strand'
    protected static commandSyntax: string = 'transcribe <RNA>'


    public static slashCommand = new SlashCommandBuilder()
        .setName('transcribe')
        .setDescription('Transcribe a DNA strand')
        .addStringOption(strand =>
            strand.setName('strand')
                .setDescription('The DNA strand to be transcribed')
                .setRequired(true)
        )


    async commandMain(interaction: ChatInputCommandInteraction, client: Tau) {
        let DNA: string = interaction.options.getString('strand')
        let RNA = DNA


        for (let i = 0; i < DNA.length; i++) {
            if (DNA.charAt(i) != 'a' && DNA.charAt(i) != 't' && DNA.charAt(i) != 'c' && DNA.charAt(i) != 'g') {
                replyEmbed(interaction, {
                    title: `Invalid DNA strand provided`,
                    color: 'RED',
                    deleteTimeout: 5000
                })
                return;

            }
        }


        
        console.log(DNA)

        RNA = RNA.replace(/a/g, 'u')
        RNA = RNA.replace(/t/g, 'a')
        RNA = RNA.replace(/c/g, 'x')
        RNA = RNA.replace(/g/g, 'c')
        RNA = RNA.replace(/x/g, 'g')

        

        const embed = new EmbedBuilder()
        embed.setColor(defaultColor)
        embed.addFields({
            name: 'DNA strand',
            value:DNA,
            inline:false
        })
        embed.addFields({
            name: 'mRNA transcript',
            value: RNA,
            inline: false
        })
        embed.setTimestamp()
        

        interaction.reply({embeds: [embed]})



    }
    
}

