import { ChatInputCommandInteraction, CacheType, EmbedBuilder, SlashCommandBuilder, User, AttachmentBuilder } from "discord.js";
import Tau from "../../../..";
import CommandClass from "../../../classes/CommandClass.js";
import defaultColor from "../../../utility/embeds/defaultColor.js";
import InteractionCommand from "../classes/InteractionCommand.js";

export default class hug extends InteractionCommand {


    public static slashCommand = new SlashCommandBuilder()
        .setName('hug')
        .setDescription('Hug someone')
        .addUserOption(user => {
            user.setName('user')
            .setDescription('The user to hug')
            .setRequired(true)
            return user
        })


    async commandMain(interaction: ChatInputCommandInteraction, client: Tau): Promise<void> {
        const gif: string = await hug.getGif('hug')
        const user: User = interaction.options.getUser('user')
        if (user == interaction.user) {
            hug.cant(interaction)
            return;
        }
        const title: string = `${interaction.user.toString()} hugs ${user.toString()}`
       

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