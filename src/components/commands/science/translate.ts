import { DiscordAPIError, DMChannel, Message, Embed, TextChannel, EmbedBuilder, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import mRNAGeneTranscript from '../../classes/genetics/mRNAGeneTranscript.js'
import CommandClass from "../../classes/CommandClass.js";
import aminoAcidSymbolToName from "../../classes/genetics/aminoAcidSymbolToName.js";
import Tau from "../../..";
import defaultColor from "../../utility/embeds/defaultColor.js";
import replyEmbed from "../../utility/embeds/replyEmbed.js";

/*
@translate.errorCheck(translate.MISSING_ARGS_ERR_METACLASS(2))
*/


export default class translate extends CommandClass {
    protected static commandCategory: string = 'science'
    protected static commandDescription: string = 'You translate a DNA strand'
    protected static commandSyntax: string = 'translate <DNA>'



    public static slashCommand = new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Translate an mRNA strand')
        .addStringOption(strand =>
            strand.setName('strand')
                .setDescription('The mRNA strand to be translated')
                .setRequired(true)
        )




    async commandMain(interaction: ChatInputCommandInteraction, client: Tau) {
        const seq = interaction.options.getString('strand')
        
        const mRNA = new mRNAGeneTranscript(seq);
        let translationWithNames: string[] = [];


        if (!mRNA.valid) {
            replyEmbed(interaction, {
                title: `Invalid mRNA transcript provided`,
                color: 'RED',
                deleteTimeout: 5000
            })
            return;
        }

        translationWithNames = mRNA.aminoAcidStrand
        for (let i = 0; i < translationWithNames.length; i++) {
            const symbol = translationWithNames[i]
            translationWithNames[i] = aminoAcidSymbolToName[symbol]
        }

        const embed = new EmbedBuilder()
        embed.setColor(defaultColor)
        embed.addFields({
            name:'mRNA transcript',
            value:  mRNA.baseSequence,
            inline:false
        })
        embed.addFields({
            name:'Polypeptide chain',
            value:String(mRNA.aminoAcidStrand),
            inline:false
        })
        embed.setTimestamp()

        interaction.reply({embeds: [embed]})



    }
}