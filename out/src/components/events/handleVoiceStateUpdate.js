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
const discordTTS = require('discord-tts');
const onBroadcastFinish = require('./../utility/onBroadcastFinish');
const playtts = function (text, client) {
    // check this
    const broadcast = client.voice.createBroadcast();
    broadcast.play(discordTTS.getVoiceStream(text));
};
function handleVoiceStateUpdate(oldState, newState, client) {
    return __awaiter(this, void 0, void 0, function* () {
        /*const member = newState.member
        const clientInGuild = newState.guild.me
    
        if (member != clientInGuild) return
        if (newState.channel == null) return
        if (oldState.channel != newState.channel) clientInGuild.voice.channel.leave()
        */
    });
}
module.exports = handleVoiceStateUpdate;
