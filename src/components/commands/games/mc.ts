import { DMChannel, Message, TextChannel } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from "../../classes/CommandClass";
import McGame from "../../classes/McGame";
import emojis from "../../utility/emojis";

const blackSquare: string = emojis.blackSquare
const character: string = emojis.character


export default class mc extends CommandClass {
    protected static commandCategory: string = 'games'
    protected static commandDescription: string = 'you play minecraft'
    protected static commandSyntax: string = 'mc'

    //static activeTextChannels: TextChannel[] = [];



    async commandMain(message: Message, client: HydroCarbon): Promise<void> {
        const gameBoard: McGame = new McGame(client, <TextChannel> message.channel);
        //mc.activeTextChannels.push(<TextChannel> message.channel)
        client.addGame(message.author.id, gameBoard)
    }

    
}