import { AudioPlayerStatus, createAudioResource, getVoiceConnection, PlayerSubscription } from "@discordjs/voice"
import { ChatInputCommandInteraction, Message, SlashCommandBuilder, TextChannel } from "discord.js"
import Tau from "../../../index"

import sendEmbed from "./../../utility/embeds/sendEmbed"
import ytdl from 'ytdl-core'
import checkQueueThenHandle from "./../../utility/checkQueueThenHandle"
import CommandClass from '../../classes/CommandClass.js'
import ConnectionWithPlayer from "../../classes/ConnectionWithPlayer.js"
import replyEmbed from "../../utility/embeds/replyEmbed.js"


@restart.alias(['r'])

@restart.errorCheck([
    restart.CLIENT_NOT_PLAYING_ANYTHING_ERR
])

export default class restart extends CommandClass { 
    protected static commandCategory: string = 'music'
    protected static commandDescription: string = 'the currently playing song restarts'
    protected static commandSyntax: string = 'restart'


    public static slashCommand = new SlashCommandBuilder()
        .setName('restart')
        .setDescription('Restarts the current song')


    public async commandMain(interaction: ChatInputCommandInteraction, client: Tau) {
        console.log(client.queueMap[interaction.guild.id].playing.url)
        const audio = ytdl(client.queueMap[interaction.guild.id].playing.url)
        const connectionP: ConnectionWithPlayer = getVoiceConnection(interaction.guild.id) as ConnectionWithPlayer
        connectionP.player.stop()

        connectionP.player.play(createAudioResource(audio))
        /*connectionP.player.on(AudioPlayerStatus.Idle, () => {
            checkQueueThenHandle(message, message.guild.me.voice.connection)
        })
        */

        replyEmbed(interaction {
            title: `Restarting ${client.queueMap[interaction.guild.id].playing.songName}`,
            color: '#ffff00',
            deleteTimeout: 10000
        })
    }
}