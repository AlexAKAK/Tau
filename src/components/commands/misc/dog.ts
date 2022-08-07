import { Message } from "discord.js";
import src from "../../..";
import CommandClass from "../../classes/CommandClass.js";
import fetch from 'node-fetch';



export default class dog extends CommandClass {

    private static url: string = 'https://dog.ceo/api/breeds/image/random'

    public async commandMain(message: Message<boolean>, client: src): Promise<void> {

        
        const res = await fetch(dog.url)
        const json = await res.json()
        const image = json['message']

        message.channel.send(image)
        

    }
    
}