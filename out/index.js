"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import dependencies
const discord_js_1 = require("discord.js");
// import commands 
const help_1 = require("./components/commands/misc/help");
const play_1 = require("./components/commands/music/play");
const stop_1 = require("./components/commands/music/stop");
const skip_1 = require("./components/commands/music/skip");
const queue_1 = require("./components/commands/music/queue");
const clear_1 = require("./components/commands/misc/clear");
const restart_1 = require("./components/commands/music/restart");
const join_1 = require("./components/commands/music/join");
const leave_1 = require("./components/commands/music/leave");
const gif_1 = require("./components/commands/misc/gif");
const loop_1 = require("./components/commands/music/loop");
const meme_1 = require("./components/commands/misc/meme");
const bal_1 = require("./components/commands/currency/bal");
const walletcreate_1 = require("./components/commands/currency/walletcreate");
const mine_1 = require("./components/commands/currency/mine");
const report_1 = require("./components/commands/misc/report");
const hack_1 = require("./components/commands/currency/hack");
const announce_1 = require("./components/commands/misc/announce");
const mc_1 = require("./components/commands/games/mc/mc");
const stopgame_1 = require("./components/commands/games/stopgame");
const currentgame_1 = require("./components/commands/games/currentgame");
const pt_1 = require("./components/science/pt");
const transcribe_1 = require("./components/science/transcribe");
const translate_1 = require("./components/science/translate");
const yt_1 = require("./components/commands/misc/yt");
const ytchannel_1 = require("./components/commands/misc/ytchannel");
// import config
const config = require('./../config.json');
class HydroCarbon extends discord_js_1.Client {
    // /property declarations
    constructor() {
        super();
        this.PREFIX = config['prefix'];
        this.TOKEN = config['token'];
        // data holders
        this.games = new Map();
        this.queueMap = new Map();
        // / data holders
        // commands
        this.TEXT_CHANNEL_COMMANDS = [
            help_1.default,
            play_1.default,
            stop_1.default,
            queue_1.default,
            skip_1.default,
            loop_1.default,
            restart_1.default,
            clear_1.default,
            join_1.default,
            leave_1.default,
            gif_1.default,
            meme_1.default,
            bal_1.default,
            walletcreate_1.default,
            mine_1.default,
            report_1.default,
            hack_1.default,
            announce_1.default,
            mc_1.default,
            stopgame_1.default,
            currentgame_1.default,
            pt_1.default,
            transcribe_1.default,
            translate_1.default,
            yt_1.default,
            ytchannel_1.default
        ];
        this.DM_COMMANDS = [
            help_1.default,
            mc_1.default,
            stopgame_1.default,
            currentgame_1.default,
            pt_1.default,
            transcribe_1.default,
            translate_1.default,
            yt_1.default,
            ytchannel_1.default
        ];
        // / commands
        // events
        this.on('ready', () => console.log("[Online]"));
        this.on('message', (message) => __awaiter(this, void 0, void 0, function* () { return this.handleMessage(message); }));
        // / events
    }
    addGame(channelID, gameObject) {
        this.games.set(channelID, gameObject);
    }
    getGame(channelID) {
        return this.games.get(channelID);
    }
    removeGame(channelID) {
        const gameObject = this.games.get(channelID);
        this.games.delete(channelID);
        return gameObject;
    }
    handleMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.channel.type === 'text')
                this.handleMessageFromTextChannel(message);
            else if (message.channel.type === 'dm')
                this.handleMessageFromDMChannel(message);
        });
    }
    handleMessageFromTextChannel(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.content.startsWith(this.PREFIX)) {
                const commandSent = message.content.replace(this.PREFIX, '').toLowerCase();
                for (let i = 0; i < this.TEXT_CHANNEL_COMMANDS.length; i++) {
                    let command = this.TEXT_CHANNEL_COMMANDS[i];
                    if (commandSent.split(' ')[0] == command.name) {
                        //setTimeout( async () => {
                        //await message.delete()
                        //}, 500)
                        //message.delete()
                        command.prototype.commandMain(message, this);
                        //addReactionBasedOnError(message, errBool)
                    }
                    // checks for an alias usage
                    for (let i = 0; i < command.aliases.length; i++) {
                        let alias = command.aliases[i];
                        if (commandSent.split(' ')[0] == alias) {
                            command.prototype.commandMain(message, this);
                        }
                    }
                }
            }
        });
    }
    handleMessageFromDMChannel(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.content.startsWith(this.PREFIX)) {
                const commandSent = message.content.replace(this.PREFIX, '').toLowerCase();
                for (let i = 0; i < this.DM_COMMANDS.length; i++) {
                    let command = this.DM_COMMANDS[i];
                    if (commandSent.split(' ')[0] == command.name) {
                        // await message.delete()
                        command.prototype.commandMain(message, this);
                        //addReactionBasedOnError(message, errBool)
                    }
                    // checks for an alias usage
                    for (let i = 0; i < command.aliases.length; i++) {
                        let alias = command.aliases[i];
                        if (commandSent.split(' ')[0] == alias) {
                            command.prototype.commandMain(message, this);
                        }
                    }
                }
            }
        });
    }
    isPlaying(guild) {
        if (guild.me.voice.connection.dispatcher == undefined || guild.me.voice.connection.dispatcher == null)
            return false;
        else
            return true;
    }
    inVoiceChannel(guild) {
        if (guild.me.voice.connection == undefined || guild.me.voice.connection == null)
            return false;
        else
            return true;
    }
}
exports.default = HydroCarbon;
// Running the bot
const client = new HydroCarbon();
client.login('ODI2MjQ3MTYwNDQ2MDU4NTA3.YGJsoQ.mykagyy_X6_xh5QpXrJbHmwn4Z0');
