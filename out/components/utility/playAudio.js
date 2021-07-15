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
const sendNowPlayingEmbed = require('./embeds/sendNowPlayingEmbed');
const ytdl = require('discord-ytdl-core');
const checkQueueThenHandle = require('./checkQueueThenHandle.js');
function playAudio(audio, voiceChannel, url, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield voiceChannel.join();
        let dispatcher = null;
        setTimeout(() => {
            dispatcher = connection.play(audio, { volume: 0.05 });
            dispatcher.on('finish', () => {
                checkQueueThenHandle(message, connection);
            });
        }, 0); // used to be 5000
        // once the song has finished playing, handle the queue
        sendNowPlayingEmbed(url, message);
    });
}
module.exports = playAudio;
