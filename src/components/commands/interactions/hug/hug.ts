import { ChatInputCommandInteraction, CacheType, EmbedBuilder, SlashCommandBuilder, User, AttachmentBuilder } from "discord.js";
import Tau from "../../../..";
import CommandClass from "../../../classes/CommandClass.js";
import defaultColor from "../../../utility/embeds/defaultColor.js";
import gifs from "./hug.json" assert {type: 'json'}

export default class hug extends CommandClass {


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
        const index: number = Math.floor(Math.random() * gifs.length)
        const gif: string = gifs[index]
        const user: User = interaction.options.getUser('user')

        const title: string = `${interaction.user.toString()} hugs ${user.toString()}`
        const file = new AttachmentBuilder(gif);

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