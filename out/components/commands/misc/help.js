"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var help_1;
Object.defineProperty(exports, "__esModule", { value: true });
const { MessageEmbed } = require('discord.js');
//const CommandClass = require('../classes/CommandClass')
const CommandClass_1 = require("../../classes/CommandClass");
// import commands
const bal_1 = require("../currency/bal");
const hack_1 = require("../currency/hack");
const mine_1 = require("../currency/mine");
const walletcreate_1 = require("../currency/walletcreate");
const announce_1 = require("./announce");
const clear_1 = require("./clear");
const gif_1 = require("./gif");
const meme_1 = require("./meme");
const report_1 = require("./report");
const join_1 = require("../music/join");
const leave_1 = require("../music/leave");
const loop_1 = require("../music/loop");
const play_1 = require("../music/play");
const queue_1 = require("../music/queue");
const restart_1 = require("../music/restart");
const skip_1 = require("../music/skip");
const stop_1 = require("../music/stop");
const commands = [
    bal_1.default,
    hack_1.default,
    mine_1.default,
    walletcreate_1.default,
    announce_1.default,
    clear_1.default,
    gif_1.default,
    meme_1.default,
    report_1.default,
    join_1.default,
    leave_1.default,
    loop_1.default,
    play_1.default,
    queue_1.default,
    restart_1.default,
    skip_1.default,
    stop_1.default
];
let help = help_1 = class help extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = help_1.splitArgsWithoutCommandCall(message);
            if (args.length == 0)
                help_1.noArgsMain(message, client);
            else
                help_1.argsMain(message, client);
        });
    }
    static noArgsMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setTimestamp();
            commands.forEach(function (command) {
                embed.addField(`${client.PREFIX}${command.commandSyntax}`, command.commandDescription, false);
            });
            const sentMessage = yield message.channel.send(embed);
            setTimeout(function () {
                if (!sentMessage['deleted'])
                    sentMessage.delete();
            }, 10000);
        });
    }
    static argsMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandName = help_1.splitArgsWithoutCommandCall(message)[0];
            if (!help_1.checkIfCommandNameIsValid(commandName)) {
                help_1.sendEmbed(message.channel, {
                    title: `Invalid command name, ${message.member.nickname}.`,
                    color: 'RED',
                    deleteTimeout: 5000
                });
                return;
            }
            const command = help_1.getCommand(help_1.splitArgsWithoutCommandCall(message)[0]);
            const embed = new MessageEmbed()
                .setTimestamp()
                .setColor('GREEN')
                .addField(`Usage: ${command.commandSyntax}`, `Description: ${command.commandDescription}`, false);
            message.channel.send(embed);
        });
    }
    static checkIfCommandNameIsValid(commandName) {
        let valid = false;
        commands.forEach(function (command) {
            if (command.name == commandName)
                valid = true;
        });
        return valid;
    }
    static getCommand(commandName) {
        let command = null;
        commands.forEach(function (_command) {
            if (_command.name == commandName)
                command = _command;
        });
        return command;
    }
};
help = help_1 = __decorate([
    help_1.alias(['h'])
], help);
exports.default = help;
