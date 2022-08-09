/* 

This file contains an ErrorClass which is extended into error classes.
Also, it contains various error classes that are used throughout this project.
Any error that is used often should appear here.

*/

import { getVoiceConnection } from '@discordjs/voice'
import { ChatInputCommandInteraction, DMChannel, Message, NewsChannel, TextChannel, VoiceState } from 'discord.js'
import Tau from '../..'

import sendEmbed from "../utility/embeds/sendEmbed"

import ErrorClass from './ErrorSuperClass.js'
//////////////////////////////////////////////////////////////////////////////////
export class CLIENT_NOT_IN_VC_ERR extends ErrorClass {

    
    
    checkPresence(interaction: ChatInputCommandInteraction) {
        console.log('client not in vc err checking')
        console.log('testing')
        const voice: VoiceState = (<Tau> interaction.client).getVoiceState(interaction.guild.id)

        // working here
        if (voice == undefined || voice == null) return true
        else return false
    }

    standardHandle(interaction: ChatInputCommandInteraction) {
        console.log('not in vc')

    
        this.sendErrMessage(interaction, `I must be in a voice channel to use the ${interaction.commandName} command, ${interaction.user.tag}.`)
    }


}


export class MEMBER_NOT_IN_VC_ERR extends ErrorClass {

    
    
    checkPresence(interaction: ChatInputCommandInteraction) {
        console.log('testing')

        if (interaction.member.voice.channel == undefined || interaction.member.voice.channel == null) return true
        else return false
    }

    standardHandle(interaction: ChatInputCommandInteraction) {

        

       
        this.sendErrMessage(interaction, `You must be in a voice channel to use the ${interaction.commandName} command, ${interaction.user.tag}.`)
    }


}




export function MISSING_ARGS_ERR_METACLASS(minArgs: number) {
    // minArgs: int. The minimum number of arguments desired by a function
    class MISSING_ARGS_ERR extends ErrorClass {

        checkPresence(message: Message) {
    
            const args = message.content.split(' ')
    
            if (args.length < minArgs) return true
            else return false
            
        }
    
        standardHandle(message: Message) {
            const commandName = this.getCommandName(message)
            // if numArgs - 1 == 1, we want to say "argument" not "arguments". That's the reason for the if/else block
            if (minArgs - 1 == 1) this.sendErrMessage(message.channel, `You must provide at least ${minArgs - 1 } argument to use the ${commandName} command, ${message.author.tag}.`)
            else this.sendErrMessage(message.channel, `You must provide at least ${minArgs - 1 } arguments to use the ${commandName} command, ${message.author.tag}.`)
            
            
        }
    
    
    }

    return MISSING_ARGS_ERR
}

export class CLIENT_NOT_PLAYING_ANYTHING_ERR extends ErrorClass {

    checkPresence(interaction: ChatInputCommandInteraction) {
        console.log('client not playing anything err checking')

        const client_t = interaction.client as Tau
        if (! (client_t.isAlreadyPlayingSomething(interaction))) return true
        else return false
    }

    standardHandle(interaction: ChatInputCommandInteraction) {
        console.log('not playing anything')
        
        
        this.sendErrMessage(interaction, `I am not playing anything, ${interaction.user.tag}. I must be playing something for you to use the ${interaction.commandName} command.`)  
    }


}

export class PLAYING_SONG_ALREADY_LOOPING_ERR extends ErrorClass {

    checkPresence(message) {
        if (message.client.queueMap[message.guild.client.voice.connection.channel.id]['playing']['loop'] === true) return true
        else return false
        
    }

    standardHandle(message) {
        const commandName = this.getCommandName(message)
        this.sendErrMessage(message.channel, `${message.client.queueMap[message.guild.client.voice.connection.channel.id]['playing']['songName']} is already looping, ${message.author.tag}`)
    }


}

export function QUANTATIVE_RANGE_ERR_METACLASS(argName, i, lowerBound, upperBound) {
    // first parameter: index of argument
    // second parameter: lower bound of argument
    // third parameter: upper bound of argument
    
    class QUANTATIVE_RANGE_ERR extends ErrorClass{
        
        checkPresence(message) {
            const args = this.splitArgs(message)
            const argToCheck = Number(args[i])

            // if the number isn't a whole number
            if (argToCheck % 1 != 0) return true 
            // if it is in range
            if (argToCheck >= lowerBound && argToCheck <= upperBound) return false
            // if it's not in range
            else return true

            
        }
    
        standardHandle(message) {
            const commandName = this.getCommandName(message)
            this.sendErrMessage(message.channel, `${argName} must an be an integer inbetween ${lowerBound} and ${upperBound} to use the ${commandName} command, ${message.author.tag}.`)
        }
    
    
    }

    return QUANTATIVE_RANGE_ERR
}

export class CLIENT_ALREADY_IN_VC_ERR extends ErrorClass {
    checkPresence(interaction: ChatInputCommandInteraction): boolean {
        console.log('testing')


        const voice = interaction.guild.voiceStates.cache.get(interaction.client.user.id)
        
        if (voice == undefined) return false
        if (voice.channel != undefined || voice.channel != null) return true;
        else return false
    }
    standardHandle(interaction: ChatInputCommandInteraction): void {
        this.sendErrMessage(interaction, `I am already in a voice channel, ${interaction.user.tag}.`)
    }
}



export class MEMBER_IN_DIFFERENT_VC_THAN_CLIENT_ERR extends ErrorClass {
    checkPresence(message: Message): boolean {
        if (message.guild.client.voice.channel != message.member.voice.channel) return true
        else return false
    }

    standardHandle(message: Message): void {
        const commandName = this.getCommandName(message)
        this.sendErrMessage(message.channel,`You must be in the same voice channel as me to use the ${commandName} command, ${message.author.tag}.`)
    }
}


export class MEMBER_ALREADY_MUTED_ERR extends ErrorClass {
    checkPresence(message: Message): boolean {
        const MUTED_ROLE = message.guild.roles.cache.get('825865649233461248')
        const args = message.content.split(' ')
        const playerId = args[1].substring(3).replace('>', '')
        const playerMember = message.guild.members.cache.get(playerId)

        if (playerMember.roles.cache.find(role => role == MUTED_ROLE)) return true
        else return false
        
    }

    standardHandle(message: Message): void {
        const args = message.content.split(' ')
        this.sendErrMessage(message.channel, `${args[1]} is already muted, ${message.author.tag}.`)
    }
}

export class MEMBER_ALREADY_UNMUTED_ERR extends ErrorClass {
    checkPresence(message: Message): boolean {
        const MUTED_ROLE = message.guild.roles.cache.get('825865649233461248')
        const args = message.content.split(' ')
        const playerId = args[1].substring(3).replace('>', '')
        const playerMember = message.guild.members.cache.get(playerId)

        let muted = false

        if (playerMember.roles.cache.find(role => role == MUTED_ROLE)) muted = true

        if (!muted) return false
        else return true
        
    }

    standardHandle(message: Message): void {
        const args = message.content.split(' ')
        this.sendErrMessage(message.channel, `${args[1]} is not muted, ${message.author.tag}.`)
    }
}

export class USER_NOT_PLAYING_A_GAME_ERR extends ErrorClass {
    checkPresence(message: any): boolean {
        // first check if a game exists. If it doesn't, return true
        // then, if a game exists, check if <gameobject>.active == false. If false, return true
        // else return false

        const gameExists: boolean = message.client.games.has(message.channel.id)
        if (!gameExists) return true
        const gameObject = message.client.games.get(message.channel.id)
        if (gameObject.active) return false
        else return true
    } 
    standardHandle(message: Message): void {
        this.sendErrMessage(message.channel, `You are not playing a game, ${message.author.tag}.`)
    }
    
}

export class USER_ALREADY_PLAYING_GAME_ERR extends ErrorClass {
    checkPresence(interaction: ChatInputCommandInteraction): boolean {
        console.log("checkpresence playing game")
        // check if a key/value pair exists in the games map. If not, return false
        // if it does exist, check if the game is active. If active, return true.
        // else return false

        const game = (<Tau> interaction.client).games.get(interaction.channel.id)
        if (game == undefined|| game == null) return false
        if (game.active == true) return true
        else return false


        
    }

    standardHandle(interaction: ChatInputCommandInteraction): void {
        this.sendErrMessage(interaction, `You are already playing a game, ${interaction.user.tag}.`)
    }
}

export type ERROR = Function
export type ERROR_METACLASS = Function
