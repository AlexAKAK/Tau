"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discordTTS = require('discord-tts');
function playtts(text, client) {
    // check this
    const broadcast = client.voice.createBroadcast();
    broadcast.play(discordTTS.getVoiceStream(text));
}
module.exports = playtts;
