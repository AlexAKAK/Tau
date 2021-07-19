import { DMChannel, Message, TextChannel } from "discord.js";
import HydroCarbon from "../../../..";
import CommandClass from "../../../classes/CommandClass";
import McGame from "./classes/McGame";
import emojis from "../../../utility/emojis";

const blackSquare: string = emojis.blackSquare
const character: string = emojis.character


@mc.errorCheck([mc.USER_ALREADY_PLAYING_GAME_ERR])
export default class mc extends CommandClass {
    protected static commandCategory: string = 'games'
    protected static commandDescription: string = 'you play minecraft'
    protected static commandSyntax: string = 'mc'


    async commandMain(message: Message, client: HydroCarbon): Promise<void> {
        console.log('running mc')
        const gameBoard: McGame = new McGame(client, <TextChannel> message.channel);
        client.addGame(message.channel.id, gameBoard)
    }

    
}