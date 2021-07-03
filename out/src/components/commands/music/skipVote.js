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
var skipvote_1;
Object.defineProperty(exports, "__esModule", { value: true });
const { MessageEmbed } = require('discord.js');
const checkQueueThenHandle = require('./../../utility/checkQueueThenHandle');
const sendEmbed = require('./../../utility/embeds/sendEmbed');
const { makeEmbed } = require('./../../utility/embeds/makeEmbed');
const { red, orange, lightBlue } = require('./../../utility/hexColors');
const CommandClass_1 = require("../../classes/CommandClass");
const { CLIENT_NOT_IN_VC_ERR } = require('./../../classes/ErrorClass');
// C:/Users/alexk/Desktop/coding projects/bryson/bryson bot 9/src/components/utility/checkQueueThenHandle.js
let skipvote = skipvote_1 = class skipvote extends CommandClass_1.default {
    calculateResult(message, client) {
        let yesCount = message.reactions.cache.get("✔️").count - 1;
        let noCount = message.reactions.cache.get("❌").count - 1;
        if (yesCount > noCount)
            this.skipSong(message, client, yesCount, noCount);
        else
            this.dontSkip(message, client, yesCount, noCount);
        // message is a Discord.message (the one where the reactions are for the vote)
    }
    skipSong(message, client, yesCount, noCount) {
        message.edit(makeEmbed({
            title: `${yesCount} people voted yes and ${noCount} voted no. Skipping ${client.queueMap[message.guild.me.voice.channel.id]['playing']['songName']}`,
            color: lightBlue,
        }));
        client.queueMap[message.guild.me.voice.connection.channel.id].playing.loop = false;
        message.guild.me.voice.connection.dispatcher.destroy();
        checkQueueThenHandle(message, message.guild.me.voice.connection);
    }
    dontSkip(message, client, yesCount, noCount) {
        message.edit(makeEmbed({
            title: `${yesCount} people voted yes and ${noCount} voted no. Not enough people voted to skip ${client.queueMap[message.guild.me.voice.channel.id]['playing']['songName']}`,
            color: lightBlue,
        }));
    }
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            // send the skip message
            const votingMessage = yield sendEmbed(message.channel, {
                title: `Skip \"${client.queueMap[message.guild.me.voice.channel.id]['playing']['songName']} requested by ${message.author.tag}. Vote will be counted in 15 seconds.`,
                color: orange,
                deleteTimeout: 20000,
            });
            // In 15 seconds, tally the votes
            // add the reactions
            votingMessage.react("✔️");
            votingMessage.react("❌");
            setTimeout(() => {
                votingMessage.edit(makeEmbed({
                    title: `Skip \"${client.queueMap[message.guild.me.voice.channel.id]['playing']['songName']} requested by ${message.author.tag}. Vote will be counted in 5 seconds.`,
                    color: orange,
                }));
            }, 10000);
            setTimeout(() => {
                this.calculateResult(votingMessage, client);
            }, 15000);
            return false;
        });
    }
};
skipvote = skipvote_1 = __decorate([
    skipvote_1.errorCheck([
        skipvote_1.CLIENT_NOT_IN_VC_ERR
    ])
], skipvote);
exports.default = skipvote;
