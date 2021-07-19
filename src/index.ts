// import dependencies
import { Client, Guild, GuildMember, Message, VoiceState } from "discord.js";

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

import mc from "./components/commands/games/mc";
import GameBoard from "./components/classes/McGame";
import stopgame from "./components/commands/games/stopgame";

//const discordButtons = require('discord-buttons')
// import config
const config: object = require('./../config.json')
type GameObject = GameBoard
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
            gif,
            meme,
            bal,
            walletcreate,
            mine,
            report,
            hack,
            announce,
        ]
        this.DM_COMMANDS = [
            help,
            mc,
            stopgame
        ]
        // / commands
        
        // events
        this.on('ready', () => console.log("[Online]"))
        this.on('message', async(message: Message) => this.handleMessage(message))
        // / events
    }

    public addGame(userID: string, gameObject: GameObject): void {
        this.games.set(userID, gameObject)
    }

    public getGame(userID: string): GameObject {
        return this.games.get(userID)
    }

    public removeGame(userID: string): GameBoard {
        const gameObject = this.games.get(userID)
        this.games.delete(userID)
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
client.login('ODI2MjQ3MTYwNDQ2MDU4NTA3.YGJsoQ.GsgJDSCcwiLNq2x874aAFbR0wGc')

