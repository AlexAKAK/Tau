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
const playAudio = require('./playAudio');
const ytdl = require('discord-ytdl-core');
const sendNowPlayingEmbed = require('./embeds/sendNowPlayingEmbed');
function checkQueueThenHandle(message, connection) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = message.client;
        const textChannel = message.channel;
        // client: bot
        // connection: Discord.VoiceConection
        // textChannel: Discord.textChannel
        // if there is a next song in the voice channel's queue
        // if the song will loop
        if (client.queueMap[message.guild.id]['playing']['loop'] === true) {
            console.log('else if');
            const url = client.queueMap[message.guild.id]['playing']['url'];
            // reset the audio by getting it from ytdl()
            const audio = ytdl(url);
            setTimeout(() => {
                const dispatcher = connection.play(audio, { type: 'opus' });
                dispatcher.on('finish', () => {
                    checkQueueThenHandle(message, connection);
                });
            }, 2000);
            sendNowPlayingEmbed(url, message);
            client.queueMap[message.guild.id]['playing']['loop'] = false;
        }
        // if the song won't loop, and there is a next song in the queue
        else if (client.queueMap[message.guild.id]['queue'][0]) {
            console.log('else if');
            const audio = client.queueMap[message.guild.id]['queue'][0]['audio'];
            const url = client.queueMap[message.guild.id]['queue'][0]['url'];
            const dispatcher = connection.play(audio, { volume: 0.05 });
            dispatcher.on('finish', () => {
                checkQueueThenHandle(message, connection);
            });
            sendNowPlayingEmbed(url, message);
            // The leading song in the queue becomes the playing one. Then, the leading song gets removed from the queue
            client.queueMap[message.guild.id]['playing'] = client.queueMap[message.guild.id]['queue'][0];
            client.queueMap[message.guild.id]['queue'].shift(); // removes the first element
        }
        // if the song won't loop and there isn't a next song in the queue
        else {
            console.log('else');
            client.queueMap.delete(message.guild.id);
        }
    });
}
module.exports = checkQueueThenHandle;
