import { Message } from "discord.js";
import src from "../../..";
import CommandClass from "../../classes/CommandClass";

export default class selfroles extends CommandClass {
    public commandMain(message: Message<boolean>, client: src): Promise<any> {
        if (message.author.id != '864397915174862860') return

        
    }

    
}