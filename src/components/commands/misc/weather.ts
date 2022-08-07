import { Message } from "discord.js";
import src from "../../..";
import CommandClass from "../../classes/CommandClass.js";

export default class weather extends CommandClass {
    private static apikey: string = '4ee2de0aa5ae4911d60e94cd602aed03'
    public async commandMain(message: Message<boolean>, client: src): Promise<void> {
        
    }
    
}