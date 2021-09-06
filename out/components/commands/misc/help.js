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
const discord_js_1 = require("discord.js");
//const CommandClass = require('../classes/CommandClass')
const CommandClass_1 = require("../../classes/CommandClass");
const defaultColor_1 = require("../../utility/embeds/defaultColor");
const errorColor_1 = require("../../utility/embeds/errorColor");
const allCommands_1 = require("../../commandCategories/allCommands");
let help = help_1 = class help extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(help_1.commands);
            for (let i = 0; i < allCommands_1.default.length; i++) {
                for (let j = 0; j < allCommands_1.default[i].commands.length; j++) {
                    help_1.commands.push(allCommands_1.default[i].commands[j]);
                }
            }
            for (const category of allCommands_1.default) {
                help_1.categories.push(category.name);
            }
            const args = help_1.splitArgsWithoutCommandCall(message);
            if (args.length == 0)
                help_1.noArgsMain(message, client);
            else
                help_1.argsMain(message, client);
        });
    }
    static noArgsMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new discord_js_1.MessageEmbed()
                .setTitle(`\`\`\`To see available commands, type: ${client.PREFIX}help <category/command>\`\`\``)
                .setColor(defaultColor_1.default)
                .setTimestamp();
            for (let i = 0; i < allCommands_1.default.length; i++) {
                //embed.addField(`\`\`\`${client.PREFIX}${allCommands[i].commandSyntax}\`\`\``, `\`\`\`${help.commands[i].commandCategory}: ${help.commands[i].commandDescription}\`\`\``, true)
                embed.addField(`\`\`\`${allCommands_1.default[i].name}\`\`\``, `\`\`\`${allCommands_1.default[i].description}\`\`\``, true);
            }
            const sentMessage = yield message.channel.send(embed);
            setTimeout(function () {
                if (!sentMessage['deleted'])
                    sentMessage.delete();
            }, 20000);
        });
    }
    static argsMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const arg = help_1.splitArgsWithoutCommandCall(message)[0].toLowerCase();
            if (help_1.categories.indexOf(arg) != -1)
                help_1.argsMainCategory(message, client, arg);
            else
                help_1.argsMainCommand(message, client);
        });
    }
    static argsMainCategory(message, client, category) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const _category of allCommands_1.default) {
                if (_category.name == category) {
                    const embed = new discord_js_1.MessageEmbed();
                    embed.setTimestamp();
                    embed.setColor(defaultColor_1.default);
                    embed.setTitle(`\`\`\`Command Category: ${_category.name}\`\`\``);
                    for (const command of _category.commands) {
                        embed.addField(`\`\`\`${client.PREFIX}${command.commandSyntax}\`\`\``, `\`\`\`${command.commandDescription}\`\`\``, true);
                    }
                    message.channel.send(embed);
                }
            }
        });
    }
    static argsMainCommand(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandName = help_1.splitArgsWithoutCommandCall(message)[0].toLowerCase();
            if (!help_1.checkIfCommandNameIsValid(commandName)) {
                help_1.sendEmbed(message.channel, {
                    title: `Invalid command name, ${message.author.tag}.`,
                    color: errorColor_1.default,
                    deleteTimeout: 5000
                });
                return;
            }
            const command = help_1.getCommand(help_1.splitArgsWithoutCommandCall(message)[0]);
            const embed = new discord_js_1.MessageEmbed()
                .setTimestamp()
                .setColor(defaultColor_1.default)
                .addField(`\`\`\`Usage: ${command.commandSyntax}\`\`\``, `\`\`\`Description: ${command.commandDescription}\`\`\``, false);
            message.channel.send(embed);
        });
    }
    static checkIfCommandNameIsValid(commandName) {
        let valid = false;
        help_1.commands.forEach(function (command) {
            if (command.name == commandName)
                valid = true;
        });
        return valid;
    }
    static getCommand(commandName) {
        let command = null;
        help_1.commands.forEach(function (_command) {
            if (_command.name == commandName)
                command = _command;
        });
        return command;
    }
};
// all commands array
help.commands = [];
//console.log(commands)
help.categories = [];
help = help_1 = __decorate([
    help_1.alias(['h'])
], help);
exports.default = help;
