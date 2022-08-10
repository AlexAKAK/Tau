import { ChatInputCommandInteraction, CacheType, EmbedBuilder, SlashCommandBuilder, User, AttachmentBuilder } from "discord.js";
import Tau from "../../../..";
import CommandClass from "../../../classes/CommandClass.js";
import defaultColor from "../../../utility/embeds/defaultColor.js";
import InteractionCommand from "../classes/InteractionCommand.js";

export default class kiss extends InteractionCommand {


    public static slashCommand = new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('Kiss someone')
        .addUserOption(user => {
            user.setName('user')
            .setDescription('The user to kiss')
            .setRequired(true)
            return user
        })


    async commandMain(interaction: ChatInputCommandInteraction, client: Tau): Promise<void> {
        const gif: string = await kiss.getGif('kiss')
        const user: User = interaction.options.getUser('user')

        const title: string = `${interaction.user.toString()} kisses ${user.toString()}`
       

        const embed = new EmbedBuilder()
            .setColor(defaultColor)
            .setTimestamp()
            //.setThumbnail()
            .setImage(gif)
           //.setTitle(title)
           .setDescription(title)
            //.setFooter({})
            


        interaction.reply({embeds: [embed]})
        
        

    }
}