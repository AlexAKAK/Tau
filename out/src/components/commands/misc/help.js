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
let help = help_1 = class help extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(help_1.aliases);
            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle(`Usage Info`)
                .addField('%play <url/keywords>', 'plays a youtube video from url or keywords')
                .addField('%stop', 'stops whatever song the bot is playing and clears the queue')
                .addField('%skip', 'skips the current song')
                .addField('%skipvote', 'creates a vote to skip the current song')
                .addField('%queue', 'displays the song queue')
                .addField('%help', 'this command')
                .addField('%loop', 'sets the current playing song to loop')
                .addField('%restart', 'restarts the current playing song')
                .addField('%gif <keywords>', 'sends a gif according to the keywords provided')
                .addField('%meme', 'sends a random meme')
                .addField('%helpstaff', 'shows the staff commands')
                .addField('%walletcreate', 'creates a wallet for BrysonCoin')
                .addField('%bal <?user>', 'shows BrysonCoin balance for you or another member')
                .addField('%mine', 'you mine 0.00001 BrysonCoin')
                .addField('%hack <user>', 'you hack someone\'s coin balance!')
                .setTimestamp();
            const sentMessage = yield message.channel.send(embed);
            setTimeout(function () {
                if (!sentMessage['deleted'])
                    sentMessage.delete();
            }, 10000);
            return false;
        });
    }
};
help = help_1 = __decorate([
    help_1.alias(['h'])
], help);
exports.default = help;
