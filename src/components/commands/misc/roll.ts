import { Message } from "discord.js";
import src from "../../..";
import CommandClass from "../../classes/CommandClass.js";

const emojis = ['', '']
export default class roll extends CommandClass {
    public async commandMain(message: Message<boolean>, client: src): Promise<void> {
        const args = message.content.split(" ");
        

        
    }
    
}