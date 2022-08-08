import { ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import src from "../../..";
import CommandClass from "../../classes/CommandClass.js";
import fetch from 'node-fetch';



export default class dog extends CommandClass {

    private static url: string = 'https://dog.ceo/api/breeds/image/random'


    public static slashCommand = new SlashCommandBuilder()
    .setName("dog")
    .setDescription("Sents a random picture of a dog!")
    

    public async commandMain(interaction: ChatInputCommandInteraction, client: src): Promise<void> {

        
        const res = await fetch(dog.url)
        const json = await res.json()
        const image = json['message']

        interaction.reply(image)
        

    }
    
}