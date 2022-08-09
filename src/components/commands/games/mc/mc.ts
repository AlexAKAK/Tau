import { ChatInputCommandInteraction, DMChannel, Message, TextChannel } from "discord.js";
import Tau from "../../../..";
import CommandClass from "../../../classes/CommandClass.js";
import McGame from "./classes/McGame.js";
import emojis from "../../../utility/emojis.js";

const blackSquare: string = emojis.blackSquare
const character: string = emojis.character


@mc.errorCheck([mc.USER_ALREADY_PLAYING_GAME_ERR])
export default class mc extends CommandClass {
    protected static commandCategory: string = 'games'
    protected static commandDescription: string = 'you play minecraft'
    protected static commandSyntax: string = 'mc'


    async commandMain(interaction: ChatInputCommandInteraction, client: Tau): Promise<void> {
        console.log('running mc')
        // creates the new game
        const gameBoard: McGame = new McGame(client, <TextChannel> interaction.channel);
        client.addGame(interaction.channel.id, gameBoard)
    }

    
}