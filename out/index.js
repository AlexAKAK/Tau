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
// import button commands
const help_1 = require("./components/commands/misc/help");
const stop_1 = require("./components/commands/music/stop");
const skip_1 = require("./components/commands/music/skip");
const queue_1 = require("./components/commands/music/queue");
const restart_1 = require("./components/commands/music/restart");
const buttonErrorChecking_1 = require("./components/utility/buttons/buttonErrorChecking");
const allCommands_1 = require("./components/commandCategories/allCommands");
const disbut = require('discord.js-buttons');
// import config
const config = require('./../config.json');
class Tau extends discord_js_1.Client {
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
        this.TEXT_CHANNEL_COMMANDS = [];
        for (let i = 0; i < allCommands_1.default.length; i++) {
            for (let j = 0; j < allCommands_1.default[i].commands.length; j++) {
                this.TEXT_CHANNEL_COMMANDS.push(allCommands_1.default[i].commands[j]);
            }
        }
        this.TEXT_CHANNEL_COMMANDS.push(help_1.default);
        this.DM_COMMANDS = [
            help_1.default,
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
exports.default = Tau;
// Running the bot
const client = new Tau();
client.login(config['token']);
disbut(client);
// buttons
client.on('clickButton', (button) => __awaiter(void 0, void 0, void 0, function* () {
    if (button.id === 'skip' && buttonErrorChecking_1.default.skip(button) == false) {
        buttonErrorChecking_1.default.skip(button);
        yield skip_1.default.prototype.commandMain(button, client);
    }
    if (button.id === 'restart' && buttonErrorChecking_1.default.restart(button) == false) {
        yield restart_1.default.prototype.commandMain(button, client);
    }
    if (button.id === 'stop' && buttonErrorChecking_1.default.stop(button) == false) {
        yield stop_1.default.prototype.commandMain(button, client);
    }
    if (button.id === 'queue' && buttonErrorChecking_1.default.queue(button) == false) {
        yield queue_1.default.prototype.commandMain(button, client);
    }
    button.defer();
}));
