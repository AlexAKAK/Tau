import { ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import Tau from "../../..";
import CommandClass from '../../classes/CommandClass.js'
//const {randomHi, randomBye} = require('./.././../utility/gifs')
import { joinVoiceChannel } from '@discordjs/voice';

/*
@join.alias(['j'])
*/



@join.errorCheck([
    join.MEMBER_NOT_IN_VC_ERR, 
    join.CLIENT_ALREADY_IN_VC_ERR
])



export default class join extends CommandClass {
    protected static commandCategory: string = 'music'
    protected static commandDescription: string = 'I join the voice channel you are in'
    protected static commandSyntax: string = 'join'



    public static slashCommand = new SlashCommandBuilder()
        .setName("join")
        .setDescription('Joins the voice channel the User is in')


    async commandMain(interaction: ChatInputCommandInteraction, client: Tau) {
        //message.member.voice.channel.join()
        
        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        // reinitialize the queue
        client.queueMap[interaction.guild.id] = undefined


        //console.log(client.getVoiceState(message.guild.id))

        interaction.reply({content: "joined", ephemeral: true})
        
    }   
}

