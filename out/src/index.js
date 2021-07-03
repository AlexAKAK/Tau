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
const discord_js_1 = require("discord.js");
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
const pt_1 = require("./components/commands/chemistry/pt");
const ion_1 = require("./components/commands/chemistry/ion");
const meme_1 = require("./components/commands/misc/meme");
const mute_1 = require("./components/commands/staff/mute");
const unmute_1 = require("./components/commands/staff/unmute");
const tempmute_1 = require("./components/commands/staff/tempmute");
const tempmutevc_1 = require("./components/commands/staff/tempmutevc");
const helpstaff_1 = require("./components/commands/staff/helpstaff");
const bal_1 = require("./components/commands/currency/bal");
const walletcreate_1 = require("./components/commands/currency/walletcreate");
const mine_1 = require("./components/commands/currency/mine");
const report_1 = require("./components/commands/misc/report");
const hack_1 = require("./components/commands/currency/hack");
const announce_1 = require("./components/commands/misc/announce");
//const discordButtons = require('discord-buttons')
const config = require('./../config.json');
class HydroCarbon extends discord_js_1.Client {
    // /property declarations
    constructor() {
        super();
        this.handleVoiceStateUpdate = require('./components/events/handleVoiceStateUpdate');
        this.PREFIX = config['prefix'];
        this.TOKEN = config['token'];
        this.TEXT_CHANNEL_COMMANDS = [
            help_1.default,
            play_1.default,
            stop_1.default,
            queue_1.default,
            skip_1.default,
            loop_1.default,
            restart_1.default,
            clear_1.default,
            //skipvote,
            join_1.default,
            leave_1.default,
            gif_1.default,
            pt_1.default,
            ion_1.default,
            mute_1.default,
            unmute_1.default,
            tempmute_1.default,
            tempmutevc_1.default,
            helpstaff_1.default,
            meme_1.default,
            bal_1.default,
            walletcreate_1.default,
            mine_1.default,
            report_1.default,
            hack_1.default,
            announce_1.default
        ];
        this.DM_COMMANDS = [
            help_1.default,
            pt_1.default,
            ion_1.default,
            helpstaff_1.default,
        ];
        this.queueMap = new Map();
        // EVENTS
        this.on('ready', () => {
            console.log("[Online]");
        });
        this.on('message', (message) => __awaiter(this, void 0, void 0, function* () {
            //try {
            // yes channel
            /**/ if (message.channel.id == '857052318951538708') {
                this.handleMessageInYesChannel(message);
                return;
            }
            this.handleMessage(message);
        }));
        this.on('voiceStateUpdate', (oldState, newState) => this.handleVoiceStateUpdate(oldState, newState, this));
        this.loginWithToken();
    }
    handleMessageInYesChannel(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.content != "Yes") {
                try {
                    message.delete();
                }
                catch (_a) { }
            }
            else if (this.mostRecentYes == message.member)
                try {
                    message.delete();
                }
                catch (_b) { }
            else
                this.mostRecentYes = message.member;
        });
    }
    loginWithToken() {
        return __awaiter(this, void 0, void 0, function* () {
            //const token = fs.readFileSync('components/data/token.txt', 'utf-8')
            this.login('ODI2MjQ3MTYwNDQ2MDU4NTA3.YGJsoQ.mxaPe7uqjJReKZEPRT25N_Xqgf0');
        });
    }
    // Command handlers
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
    // /Command handlers
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
