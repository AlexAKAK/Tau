import { Message, TextChannel } from "discord.js"
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass.js";
const fetch = require('node-fetch')



export default class meme extends CommandClass {
    protected static commandCategory: string = 'misc'
    protected static commandDescription: string = 'A random meme is sent into the chat'
    protected static commandSyntax: string = 'meme'
    
    async commandMain(message: Message, client: Tau) {

        const memeFromReddit = await meme.getRandomMeme()  
        try {message.channel.send(memeFromReddit)}
        catch {meme.sendEmbed(<TextChannel> message.channel, {
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