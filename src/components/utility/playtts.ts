import { Message, VoiceChannel } from "discord.js";
import Tau from "../..";

const discordTTS = require('discord-tts');

function playtts(text: string, client: Tau) {
    // check this
    const broadcast = client.voice.createBroadcast();
    broadcast.play(discordTTS.getVoiceStream(text));
}

module.exports = playtts