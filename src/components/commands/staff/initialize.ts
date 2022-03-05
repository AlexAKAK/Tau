import { Message } from "discord.js";
import src from "../../..";
import CommandClass from "../../classes/CommandClass";
import setup from "../../qt/setup";

export default class initialize extends CommandClass {

    protected static commandCategory: string = 'staff'
    protected static commandDescription: string = 'initializes the bot'
    protected static commandSyntax: string = 'initialize'

    
    public async commandMain(message: Message<boolean>, client: src): Promise<void> {
        message.channel.send('Initializing...')
        await setup(client);
        message.channel.send('Initialized!')
    }
}