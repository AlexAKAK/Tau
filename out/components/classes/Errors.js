"use strict";
/*

This file contains an ErrorClass which is extended into error classes.
Also, it contains various error classes that are used throughout this project.
Any error that is used often should appear here.

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_ALREADY_PLAYING_GAME_ERR = exports.USER_NOT_PLAYING_A_GAME_ERR = exports.MEMBER_ALREADY_UNMUTED_ERR = exports.MEMBER_ALREADY_MUTED_ERR = exports.MEMBER_IN_DIFFERENT_VC_THAN_CLIENT_ERR = exports.CLIENT_ALREADY_IN_VC_ERR = exports.QUANTATIVE_RANGE_ERR_METACLASS = exports.PLAYING_SONG_ALREADY_LOOPING_ERR = exports.CLIENT_NOT_PLAYING_ANYTHING_ERR = exports.MISSING_ARGS_ERR_METACLASS = exports.MEMBER_NOT_IN_VC_ERR = exports.CLIENT_NOT_IN_VC_ERR = void 0;
const sendEmbed = require("../utility/embeds/sendEmbed");
const { red } = require("./../utility/hexColors");
const ErrorSuperClass_1 = require("./ErrorSuperClass");
//////////////////////////////////////////////////////////////////////////////////
class CLIENT_NOT_IN_VC_ERR extends ErrorSuperClass_1.default {
    checkPresence(message) {
        console.log('client not in vc err checking');
        if (message.guild.me.voice.channel == undefined || message.guild.me.voice.channel == null)
            return true;
        else
            return false;
    }
    standardHandle(message) {
        console.log('not in vc');
        const commandName = this.getCommandName(message);
        this.sendErrMessage(message.channel, `I must be in a voice channel to use the ${commandName} command, ${message.author.tag}.`);
    }
}
exports.CLIENT_NOT_IN_VC_ERR = CLIENT_NOT_IN_VC_ERR;
class MEMBER_NOT_IN_VC_ERR extends ErrorSuperClass_1.default {
    checkPresence(message) {
        if (message.member.voice.channel == undefined || message.member.voice.channel == null)
            return true;
        else
            return false;
    }
    standardHandle(message) {
        const commandName = this.getCommandName(message);
        this.sendErrMessage(message.channel, `You must be in a voice channel to use the ${commandName} command, ${message.author.tag}.`);
    }
}
exports.MEMBER_NOT_IN_VC_ERR = MEMBER_NOT_IN_VC_ERR;
function MISSING_ARGS_ERR_METACLASS(minArgs) {
    // minArgs: int. The minimum number of arguments desired by a function
    class MISSING_ARGS_ERR extends ErrorSuperClass_1.default {
        checkPresence(message) {
            const args = message.content.split(' ');
            if (args.length < minArgs)
                return true;
            else
                return false;
        }
        standardHandle(message) {
            const commandName = this.getCommandName(message);
            // if numArgs - 1 == 1, we want to say "argument" not "arguments". That's the reason for the if/else block
            if (minArgs - 1 == 1)
                this.sendErrMessage(message.channel, `You must provide at least ${minArgs - 1} argument to use the ${commandName} command, ${message.author.tag}.`);
            else
                this.sendErrMessage(message.channel, `You must provide at least ${minArgs - 1} arguments to use the ${commandName} command, ${message.author.tag}.`);
        }
    }
    return MISSING_ARGS_ERR;
}
exports.MISSING_ARGS_ERR_METACLASS = MISSING_ARGS_ERR_METACLASS;
class CLIENT_NOT_PLAYING_ANYTHING_ERR extends ErrorSuperClass_1.default {
    checkPresence(message) {
        console.log('client not playing anything err checking');
        if (message.guild.me.voice.connection.dispatcher == undefined || message.guild.me.voice.connection.dispatcher == null)
            return true;
        else
            return false;
    }
    standardHandle(message) {
        console.log('not playing anything');
        const commandName = this.getCommandName(message);
        this.sendErrMessage(message.channel, `I am not playing anything, ${message.author.tag}. I must be playing something for you to use the ${commandName} command.`);
    }
}
exports.CLIENT_NOT_PLAYING_ANYTHING_ERR = CLIENT_NOT_PLAYING_ANYTHING_ERR;
class PLAYING_SONG_ALREADY_LOOPING_ERR extends ErrorSuperClass_1.default {
    checkPresence(message) {
        if (message.client.queueMap[message.guild.me.voice.connection.channel.id]['playing']['loop'] === true)
            return true;
        else
            return false;
    }
    standardHandle(message) {
        const commandName = this.getCommandName(message);
        this.sendErrMessage(message.channel, `${message.client.queueMap[message.guild.me.voice.connection.channel.id]['playing']['songName']} is already looping, ${message.author.tag}`);
    }
}
exports.PLAYING_SONG_ALREADY_LOOPING_ERR = PLAYING_SONG_ALREADY_LOOPING_ERR;
function QUANTATIVE_RANGE_ERR_METACLASS(argName, i, lowerBound, upperBound) {
    // first parameter: index of argument
    // second parameter: lower bound of argument
    // third parameter: upper bound of argument
    class QUANTATIVE_RANGE_ERR extends ErrorSuperClass_1.default {
        checkPresence(message) {
            const args = this.splitArgs(message);
            const argToCheck = Number(args[i]);
            // if the number isn't a whole number
            if (argToCheck % 1 != 0)
                return true;
            // if it is in range
            if (argToCheck >= lowerBound && argToCheck <= upperBound)
                return false;
            // if it's not in range
            else
                return true;
        }
        standardHandle(message) {
            const commandName = this.getCommandName(message);
            this.sendErrMessage(message.channel, `${argName} must an be an integer inbetween ${lowerBound} and ${upperBound} to use the ${commandName} command, ${message.author.tag}.`);
        }
    }
    return QUANTATIVE_RANGE_ERR;
}
exports.QUANTATIVE_RANGE_ERR_METACLASS = QUANTATIVE_RANGE_ERR_METACLASS;
class CLIENT_ALREADY_IN_VC_ERR extends ErrorSuperClass_1.default {
    checkPresence(message) {
        if (message.guild.me.voice.channel != null)
            return true;
        else
            return false;
    }
    standardHandle(message) {
        this.sendErrMessage(message.channel, `I am already in a voice channel, ${message.author.tag}.`);
    }
}
exports.CLIENT_ALREADY_IN_VC_ERR = CLIENT_ALREADY_IN_VC_ERR;
class MEMBER_IN_DIFFERENT_VC_THAN_CLIENT_ERR extends ErrorSuperClass_1.default {
    checkPresence(message) {
        if (message.guild.me.voice.channel != message.member.voice.channel)
            return true;
        else
            return false;
    }
    standardHandle(message) {
        const commandName = this.getCommandName(message);
        this.sendErrMessage(message.channel, `You must be in the same voice channel as me to use the ${commandName} command, ${message.author.tag}.`);
    }
}
exports.MEMBER_IN_DIFFERENT_VC_THAN_CLIENT_ERR = MEMBER_IN_DIFFERENT_VC_THAN_CLIENT_ERR;
class MEMBER_ALREADY_MUTED_ERR extends ErrorSuperClass_1.default {
    checkPresence(message) {
        const MUTED_ROLE = message.guild.roles.cache.get('825865649233461248');
        const args = message.content.split(' ');
        const playerId = args[1].substring(3).replace('>', '');
        const playerMember = message.guild.members.cache.get(playerId);
        if (playerMember.roles.cache.find(role => role == MUTED_ROLE))
            return true;
        else
            return false;
    }
    standardHandle(message) {
        const args = message.content.split(' ');
        this.sendErrMessage(message.channel, `${args[1]} is already muted, ${message.author.tag}.`);
    }
}
exports.MEMBER_ALREADY_MUTED_ERR = MEMBER_ALREADY_MUTED_ERR;
class MEMBER_ALREADY_UNMUTED_ERR extends ErrorSuperClass_1.default {
    checkPresence(message) {
        const MUTED_ROLE = message.guild.roles.cache.get('825865649233461248');
        const args = message.content.split(' ');
        const playerId = args[1].substring(3).replace('>', '');
        const playerMember = message.guild.members.cache.get(playerId);
        let muted = false;
        if (playerMember.roles.cache.find(role => role == MUTED_ROLE))
            muted = true;
        if (!muted)
            return false;
        else
            return true;
    }
    standardHandle(message) {
        const args = message.content.split(' ');
        this.sendErrMessage(message.channel, `${args[1]} is not muted, ${message.author.tag}.`);
    }
}
exports.MEMBER_ALREADY_UNMUTED_ERR = MEMBER_ALREADY_UNMUTED_ERR;
class USER_NOT_PLAYING_A_GAME_ERR extends ErrorSuperClass_1.default {
    checkPresence(message) {
        // first check if a game exists. If it doesn't, return true
        // then, if a game exists, check if <gameobject>.active == false. If false, return true
        // else return false
        const gameExists = message.client.games.has(message.channel.id);
        if (!gameExists)
            return true;
        const gameObject = message.client.games.get(message.channel.id);
        if (gameObject.active)
            return false;
        else
            return true;
    }
    standardHandle(message) {
        this.sendErrMessage(message.channel, `You are not playing a game, ${message.author.tag}.`);
    }
}
exports.USER_NOT_PLAYING_A_GAME_ERR = USER_NOT_PLAYING_A_GAME_ERR;
class USER_ALREADY_PLAYING_GAME_ERR extends ErrorSuperClass_1.default {
    checkPresence(message) {
        console.log("checkpresence playing game");
        // check if a key/value pair exists in the games map. If not, return false
        // if it does exist, check if the game is active. If active, return true.
        // else return false
        const game = message.client.games.get(message.channel.id);
        if (game == undefined || game == null)
            return false;
        if (game.active == true)
            return true;
        else
            return false;
    }
    standardHandle(message) {
        this.sendErrMessage(message.channel, `You are already playing a game, ${message.author.tag}.`);
    }
}
exports.USER_ALREADY_PLAYING_GAME_ERR = USER_ALREADY_PLAYING_GAME_ERR;
