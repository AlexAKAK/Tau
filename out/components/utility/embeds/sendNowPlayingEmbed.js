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
const { MessageEmbed } = require('discord.js');
const { getInfo } = require('ytdl-core');
const textFormatting = require('../textFormatting');
const getYoutubeVideoThumbnail = require('../getYoutubeVideoThumbnail');
const { randomColor } = require('../hexColors');
const { green, bold, orange, yellow } = require('../textFormatting');
const defaultColor_1 = require("./defaultColor");
// make this an async function to avoid having to declare the promise
function createNowPlayingEmbedPromise(url, message /*discord.Message*/) {
    return __awaiter(this, void 0, void 0, function* () {
        const info = yield getInfo(url);
        let nowPlayingEmbed = new MessageEmbed();
        /*
        const lengthSeconds = info.videoDetails.lengthSeconds
        const minutes = Math.floor(info.videoDetails.lengthSeconds/60)
        const seconds = info.videoDetails.lengthSeconds-Math.floor(info.videoDetails.lengthSeconds/60)*60
    
        let timeToDisplay;
        if (lengthSeconds == 0) timeToDisplay = "livestream"
        else {
            // add an extra 0 if the seconds are < 10
            if (seconds < 10) timeToDisplay = `${minutes}:0${seconds}`
            else timeToDisplay = `${minutes}:${seconds}`
        }
        */
        const author = message.client.queueMap[message.guild.id].playing.author.tag;
        nowPlayingEmbed
            .setColor(defaultColor_1.default)
            .setTitle(`Now Playing: ${info['videoDetails']['title']}`)
            .setURL(url)
            .addField(`\`\`\`Queued by: ${author}\`\`\``, `${url}`) // used to be timeToDisplay
            .setImage(getYoutubeVideoThumbnail(url))
            .setTimestamp();
        return nowPlayingEmbed;
    });
}
function sendNowPlayingEmbed(url, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const nowPlayingEmbed = yield createNowPlayingEmbedPromise(url, message);
        message.channel.send(nowPlayingEmbed);
    });
}
module.exports = sendNowPlayingEmbed;
