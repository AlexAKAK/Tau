import { Message } from "discord.js";
import src from "../../..";
import CommandClass from "../../classes/CommandClass";

var youtubesearchapi=require('youtube-search-api');

export default class yt extends CommandClass {

    protected static commandCategory: string = 'misc'
    protected static commandDescription: string = 'Outputs the top 10 search results for a youtube search'
    protected static commandSyntax: string = 'yt <query>'

    public async commandMain(message: Message, client: src): Promise<any> {
        
    }
    
}