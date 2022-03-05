import { Message } from "discord.js";
import src from "../../..";
import CommandClass from "../../classes/CommandClass";
import setup from "../../qt/setup";

export default class initialize extends CommandClass {
    public async commandMain(message: Message<boolean>, client: src): Promise<void> {
        message.channel.send('Initializing...')
        await setup(client);
        message.channel.send('Initialized!')
    }
}