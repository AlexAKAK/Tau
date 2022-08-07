// import dependencies
import { Client, GatewayIntentBits, Guild, GuildMember, Message, MessageEmbed, MessageReaction, VoiceState, Intents, Permissions} from "discord.js";

// import button commands
import help from './components/commands/misc/help.js'
import stop from './components/commands/music/stop.js'
import skip from './components/commands/music/skip.js'
import queue from './components/commands/music/queue.js'
import restart from './components/commands/music/restart.js'

import McGame from "./components/commands/games/mc/classes/McGame.js";
//import buttonErrorChecking from "./components/utility/buttons/buttonErrorChecking";
import allCommands from "./components/commandCategories/allCommands.js";
import setup from "./components/qt/setup.js";
//import memberJoin from "./components/qt/events/memberJoin.js";
import moderation from "./components/utility/moderation.js";
import registerSlashCommands from "./components/utility/registerSlashCommands.js";


//const disbut = require('discord.js-buttons')

// import config
const config: object = require('./../config.json')
type GameObject = McGame
export default class Tau extends Client {

    // property declarations
    public on: any
    public login: any
    public games: Map<string, GameObject>
    public TEXT_CHANNEL_COMMANDS: any[];
    public DM_COMMANDS: any[];
    public PREFIX: string = config['prefix']
    public TOKEN: string = config['token']
    public queueMap: Map<string, object>;
    public qtServer: Guild;
    // /property declarations
    constructor() {
        /*super({intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_BANS,
            Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
            Intents.FLAGS.GUILD_INTEGRATIONS,
            Intents.FLAGS.GUILD_WEBHOOKS,
            Intents.FLAGS.GUILD_INVITES,
            Intents.FLAGS.GUILD_VOICE_STATES,
            Intents.FLAGS.GUILD_PRESENCES,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.GUILD_MESSAGE_TYPING,
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
            Intents.FLAGS.DIRECT_MESSAGE_TYPING,
            Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
            Intents.FLAGS.GUILD_INTEGRATIONS
        ]
    })
    */

    super({intents: [GatewayIntentBits.Guilds]})
        // data holders
        this.games = new Map<string, GameObject>()
        this.queueMap = new Map<any, any>()
        // / data holders
        // commands
        this.TEXT_CHANNEL_COMMANDS = [
            
        ]
        for (let i = 0; i < allCommands.length; i++) {
                for (let j = 0; j < allCommands[i].commands.length; j++) {
                    this.TEXT_CHANNEL_COMMANDS.push(allCommands[i].commands[j])
                }
        }
        this.TEXT_CHANNEL_COMMANDS.push(help)

        this.DM_COMMANDS = [
            help,
            /*
            mc,
            stopgame,
            currentgame,
            pt,
            transcribe,
            translate,
            yt,
            ytchannel
            */
        ]
        // / commands
        
        // events
        this.on('ready', () => {
            console.log("[Online]")
            this.qtServer = this.guilds.cache.find(guild => guild.id == config['qtServerID'])

            client.guilds.cache.map(guild => {
                // iterate through the list of guilds
                registerSlashCommands(client, client.TOKEN, guild.id) 
            });

            //if (config['initialize']) setup(this)
        })
        this.on('messageCreate', async(message: Message) => this.handleMessage(message))
        console.log(this.PREFIX)
        // / events
        this.on('guildMemberAdd', async (member: GuildMember) => {
            memberJoin(this, member)
        })
    }

    isAlreadyPlayingSomething(message: Message) {
        const a = client.queueMap[message.guild.id]
        console.log(a)

        if (a == undefined) return false
        else return true
        
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
        console.log(message.content)

        this.handleMessageFromTextChannel(message)
        /*
      if (message.channel.type === 'text') this.handleMessageFromTextChannel(message)
      else if (message.channel.type === 'dm') this.handleMessageFromDMChannel(message)
      */
    }

    async handleMessageFromTextChannel(message: Message) {
      if (message.content.startsWith(this.PREFIX)) {

          const commandSent = message.content.replace(this.PREFIX, '').toLowerCase()
          for (let i= 0; i < this.TEXT_CHANNEL_COMMANDS.length; i++) {
              let command = this.TEXT_CHANNEL_COMMANDS[i]
              if (commandSent.split(' ')[0] == command.name) {
                  console.log('2')
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
const client: Tau = new Tau();
client.login(config['token'])
moderation(client)







/*
client.on("messageCreate", (message: Message) => {
    const dancingbaker: string = '294262526902927361'
    const jaz: string = '818554234836484156'
    const alex: string = '864397915174862860'

    if (message.author.id == dancingbaker || message.author.id == jaz || message.author.id == alex) {
        message.reply('ok');
    }
})
*/

//disbut(<Client> client)

// buttons
/*
client.on('clickButton', async (button: any) => {
    if (button.id === 'skip'&&buttonErrorChecking.skip(button) == false) {
        buttonErrorChecking.skip(button)
        await skip.prototype.commandMain(button, client)
    }
    if (button.id === 'restart'&&buttonErrorChecking.restart(button) == false) {
        await restart.prototype.commandMain(button, client)
    }
    if (button.id === 'stop'&&buttonErrorChecking.stop(button) == false) {
        await stop.prototype.commandMain(button, client)
    }
    if (button.id === 'queue'&&buttonErrorChecking.queue(button) == false) {
        await queue.prototype.commandMain(button, client)
    }

    button.defer()
});




"discord.js": "^13.6.0",

*/