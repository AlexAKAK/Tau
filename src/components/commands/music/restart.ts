import { Message, TextChannel } from "discord.js"
import HydroCarbon from "../../../index"

const sendEmbed = require("./../../utility/embeds/sendEmbed")
const { red, randomColor } = require("./../../utility/hexColors")
const ytdl = require('ytdl-core-discord')
const checkQueueThenHandle = require("./../../utility/checkQueueThenHandle")
import CommandClass from '../../classes/CommandClass'


@restart.alias(['r'])

@restart.errorCheck([
    restart.CLIENT_NOT_PLAYING_ANYTHING_ERR
])

export default class restart extends CommandClass { 
    protected static commandCategory: string = 'music'
    protected static commandDescription: string = 'the currently playing song restarts'
    protected static commandSyntax: string = 'restart'

    public async commandMain(message: Message, client: HydroCarbon) {
        
        const audio = await ytdl(client.queueMap[message.guild.id].playing.url)
        if (message.guild.me.voice.connection.dispatcher != null) message.guild.me.voice.connection.dispatcher.destroy()

        const dispatcher = message.guild.me.voice.connection.play(audio, {type: 'opus', volume: 0.05})
        dispatcher.on('finish', () => {
            checkQueueThenHandle(message, message.guild.me.voice.connection)
        })

        restart.sendEmbed(<TextChannel> message.channel, {
            title: `Restarting ${client.queueMap[message.guild.id].playing.songName}`,
            color: randomColor(),
            deleteTimeout: 10000
        })
    }
}