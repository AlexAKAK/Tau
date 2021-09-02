// import dependencies
import { Client, Guild, GuildMember, Message, MessageEmbed, MessageReaction, VoiceState } from "discord.js";

// import commands 
import help from './components/commands/misc/help'
import play from './components/commands/music/play'
import stop from './components/commands/music/stop'
import skip from './components/commands/music/skip'
import queue from './components/commands/music/queue'
import clear from './components/commands/misc/clear'
import restart from './components/commands/music/restart'
import join from './components/commands/music/join'
import leave from './components/commands/music/leave'
import gif from './components/commands/misc/gif'
import loop from './components/commands/music/loop'
import meme from './components/commands/misc/meme'



import bal from './components/commands/currency/bal'
import walletcreate from './components/commands/currency/walletcreate'
import mine from './components/commands/currency/mine'

import report from './components/commands/misc/report'
import hack from "./components/commands/currency/hack";

import announce from "./components/commands/misc/announce";

import mc from "./components/commands/games/mc/mc";
import stopgame from "./components/commands/games/stopgame";
import currentgame from "./components/commands/games/currentgame";

import pt from "./components/science/pt";
import transcribe from "./components/science/transcribe";
import translate from "./components/science/translate";
// import games
import McGame from "./components/commands/games/mc/classes/McGame";
import yt from "./components/commands/misc/yt";
import ytchannel from "./components/commands/misc/ytchannel";
import { MessageButton, MessageButtonStyles } from "discord-buttons";
import shuffle from "./components/commands/music/shuffle";

const disbut = require('discord.js-buttons')

// import config
const config: object = require('./../config.json')
type GameObject = McGame
export default class HydroCarbon extends Client {

    // property declarations
    public on: any
    public login: any
    public games: Map<string, GameObject>
    public TEXT_CHANNEL_COMMANDS: any[];
    public DM_COMMANDS: any[];
    public PREFIX: string = config['prefix']
    public TOKEN: string = config['token']
    public queueMap: Map<any, any>;


    // /property declarations
    constructor() {
        super()
        // data holders
        this.games = new Map<string, GameObject>()
        this.queueMap = new Map<any, any>()
        // / data holders
        // commands
        this.TEXT_CHANNEL_COMMANDS = [
            help,
            play,
            stop,
            queue,
            skip,
            loop,
            restart,
            clear,
            join,
            leave,
            shuffle,
            gif,
            meme,
            bal,
            walletcreate,
            mine,
            report,
            hack,
            announce,
            mc,
            stopgame,
            currentgame,
            pt,
            transcribe,
            translate,
            yt,
            ytchannel
        ]
        this.DM_COMMANDS = [
            help,
            mc,
            stopgame,
            currentgame,
            pt,
            transcribe,
            translate,
            yt,
            ytchannel
        ]
        // / commands
        
        // events
        this.on('ready', () => console.log("[Online]"))
        this.on('message', async(message: Message) => this.handleMessage(message))
        // / events
    }

    public addGame(channelID: string, gameObject: GameObject): void {
        this.games.set(channelID, gameObject)
    }

    public getGame(channelID: string): GameObject {
        return this.games.get(channelID)
    }

    public removeGame(channelID: string): McGame {
        const gameObject = this.games.get(channelID)
        this.games.delete(channelID)
        return gameObject
    }

    async handleMessage(message: Message) {

      if (message.channel.type === 'text') this.handleMessageFromTextChannel(message)
      else if (message.channel.type === 'dm') this.handleMessageFromDMChannel(message)
    }

    async handleMessageFromTextChannel(message: Message) {
      if (message.content.startsWith(this.PREFIX)) {

          const commandSent = message.content.replace(this.PREFIX, '').toLowerCase()
          for (let i= 0; i < this.TEXT_CHANNEL_COMMANDS.length; i++) {
              let command = this.TEXT_CHANNEL_COMMANDS[i]
              if (commandSent.split(' ')[0] == command.name) {
                  //setTimeout( async () => {
                      //await message.delete()
                  //}, 500)
          
                  //message.delete()
                  command.prototype.commandMain(message, this)
                  //addReactionBasedOnError(message, errBool)
                      
              }
            
              // checks for an alias usage
              for (let i = 0; i < command.aliases.length; i++) {
                  let alias = command.aliases[i]
                    if (commandSent.split(' ')[0] == alias) {
                        command.prototype.commandMain(message, this)
                    }
              }
          }
      }
    }
    async handleMessageFromDMChannel(message: Message) {


      if (message.content.startsWith(this.PREFIX)) {
          const commandSent = message.content.replace(this.PREFIX, '').toLowerCase()
          for (let i= 0; i < this.DM_COMMANDS.length; i++) {
              let command = this.DM_COMMANDS[i]
              if (commandSent.split(' ')[0] == command.name) {
                  // await message.delete()
                  command.prototype.commandMain(message, this)
                  //addReactionBasedOnError(message, errBool)
                  
              }

            // checks for an alias usage
            for (let i = 0; i < command.aliases.length; i++) {
                let alias = command.aliases[i]
                  if (commandSent.split(' ')[0] == alias) {
                      command.prototype.commandMain(message, this)
                  }
            }
          }
      }
    }


    isPlaying(guild: Guild): boolean {
        if (guild.me.voice.connection.dispatcher == undefined || guild.me.voice.connection.dispatcher == null) return false
        else return true
    }

    inVoiceChannel(guild: Guild): boolean {
        if (guild.me.voice.connection == undefined || guild.me.voice.connection == null) return false
        else return true
    }

}

// Running the bot
const client: HydroCarbon = new HydroCarbon();
client.login('ODI2MjQ3MTYwNDQ2MDU4NTA3.YGJsoQ.mMMtiZeWHv2lcX1NrBM8RetDtag')
disbut(<Client> client)


client.on('clickButton', async (button: any) => {
    if (button.id === 'skip') await skip.prototype.commandMain(button, client)
    if (button.id === 'restart') await restart.prototype.commandMain(button, client)
    if (button.id === 'stop') await stop.prototype.commandMain(button, client)
    if (button.id === 'queue') await queue.prototype.commandMain(button, client)



    button.defer()
});
