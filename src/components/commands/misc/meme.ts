import { ChatInputCommandInteraction, Message, SlashCommandBuilder, TextChannel } from "discord.js"
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass.js";
import fetch from 'node-fetch';



export default class meme extends CommandClass {
    protected static commandCategory: string = 'misc'
    protected static commandDescription: string = 'A random meme is sent into the chat'
    protected static commandSyntax: string = 'meme'


    public static slashCommand = new SlashCommandBuilder()
        .setDescription("Sends a random meme")
        .setName('meme')

    
    async commandMain(interaction: ChatInputCommandInteraction, client: Tau) {

        const memeFromReddit = await meme.getRandomMeme()  
        try {interaction.reply(memeFromReddit)}
        catch {meme.sendEmbed(<TextChannel> interaction.channel, {
            title: `An unexpected error occured. please try again later.`,
            color: 'GREEN',
            deleteTimeout: 5000
        })}

    }

    static async getRandomMeme() {

        const res = await fetch('https://www.reddit.com/r/memes/hot.json?limit=10000')

        const resJSON = await res.json()
        const children =  resJSON['data']['children']
        
        return meme.randomElement(children)['data']['url_overridden_by_dest']
    }

    static randomElement(a: any[]) {
        return a[Math.floor(Math.random()*a.length)];
    }

}