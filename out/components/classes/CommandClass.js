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
const discord_js_1 = require("discord.js");
const errorClasses = require("./Errors");
const errorColor_1 = require("../utility/embeds/errorColor");
const defaultColor_1 = require("../utility/embeds/defaultColor");
const fs = require('fs');
/* make the err list definable as a static property of the CommandClass subclass, then use .class to
retrieve the class. After, use that to call CommandClass.constructor (super, in context).
*/
const sendEmbed = require('./../utility/embeds/sendEmbed');
class CommandClass {
    // misc methods
    static splitArgs(message) {
        return message.content.split(' ');
    }
    static splitArgsWithoutCommandCall(message) {
        const args = message.content.split(' ');
        args.shift();
        return args;
    }
    static removePrefixFromString(s, prefix) {
        return s.substring(prefix.length + 2);
    }
    static removePrefixAndCommandFromString(s, prefix) {
        return s.substring(s.indexOf(' ') + 1);
    }
    static sendErrMessage(channel, errMessage) {
        sendEmbed(channel, {
            title: errMessage,
            color: errorColor_1.default,
            deleteTimeout: 5000
        });
    }
    static sendEmbed(channel, kwargs) {
        // message is a discord.message, kwargs is a dictionary
        let embed = new discord_js_1.MessageEmbed();
        /*if (kwargs['color'])*/ embed.setColor(defaultColor_1.default);
        if (kwargs['title'])
            embed.setTitle(`${kwargs['title']}`);
        if (kwargs['image'])
            embed.setImage(`${kwargs['image']}`);
        // the elements in kwargs['fields'] are dictionaries
        if (kwargs['fields']) { ////////////////////////////////////////////////////////////////
            for (let i = 0; i < kwargs['fields'].length; i++) {
                const name = kwargs['fields'][i]['name'];
                const value = kwargs['fields'][i]['value'];
                embed.addField(name, value, false);
            }
        }
        // default timeout for delete if 5 seconds. Can be changed or removed comepletely.
        //let deleteTimeout = 5000
        //if (kwargs['deleteTimeout']) {
        //    console.log('deleteTimeout')
        //    console.log(kwargs['deleteTimeout'])
        //    if (kwargs['deleteTimeout'] == false) deleteTimeout = undefined
        //    else if (typeof kwargs['deleteTimeout'] == Number) timeout = kwargs['deleteTimeout']
        embed.setTimestamp();
        // sends the embed message, then returns a promise that resolves to the message.
        const sentMessagePromise = channel.send(embed);
        // if there's a deleteTimeout specified
        sentMessagePromise
            .then((message) => {
            if (kwargs['deleteTimeout']) {
                setTimeout(function () {
                    message.delete();
                }, kwargs['deleteTimeout']);
            }
        });
        return sentMessagePromise;
    }
    // decorator factory
    static role(roles) {
        // return the decorator
        return function (target) {
            // define the newCommandMain method
            const oldCommandMain = target.prototype.commandMain;
            const newCommandMain = (message, client) => __awaiter(this, void 0, void 0, function* () {
                const commandName = message.content.split(' ')[0].substring(1);
                console.log('checking roles');
                let rolePresent = false;
                for (let i = 0; i < roles.length; i++) {
                    if (message.member.roles.cache.find(role => Number(role.id) == roles[i]))
                        rolePresent = true;
                }
                if (rolePresent)
                    oldCommandMain(message, client);
                else
                    sendEmbed(message.channel, {
                        title: `You do not have the required permissions to use the ${commandName} command, ${message.author.tag}.`,
                        color: errorColor_1.default,
                        deleteTimeout: 5000,
                    });
            });
            // edit the method
            target.prototype.commandMain = newCommandMain;
        };
    }
    static unStable(target) {
        const oldCommandMain = target.prototype.commandMain;
        const newCommandMain = (message, client) => __awaiter(this, void 0, void 0, function* () {
            if (message.author.id == '536235243938643998')
                oldCommandMain(message, client);
            else
                sendEmbed(message.channel, {
                    title: `This command is unstable. At this time, only Alex AK may use this command`,
                    color: errorColor_1.default,
                    deleteTimout: 5000
                });
            target.prototype.commandMain = newCommandMain;
        });
    }
    static getMember(id, guild) {
        console.log(`ID: ${id}`);
        console.log(`GUILD: ${guild}`);
        const member = guild.members.cache.get(id);
        return member;
    }
    static SPECIAL(target) {
        const oldCommandMain = target.prototype.commandMain;
        const newCommandMain = (message, client) => __awaiter(this, void 0, void 0, function* () {
            if (message.author.id == '536235243938643998')
                oldCommandMain(message, client);
            target.prototype.commandMain = newCommandMain;
        });
    }
    static alias(aliases) {
        return function (target) {
            target.aliases = aliases;
        };
    }
    // for currency
    static modifyBalance(memberId, amount) {
        const wallets = require('./../../../data/wallets.json');
        //check if there is a wallet for the memberId
        if (wallets[memberId] == undefined)
            return false;
        wallets[memberId] += amount;
        const jsonString = JSON.stringify(wallets);
        const logPath = require('path').resolve(__dirname, './../../../data/wallets.json');
        fs.writeFile(logPath, jsonString, err => {
            if (err) {
                console.error(err);
                return;
            }
            //file written successfully
        });
    }
    // for currency
    static stealCoin(recipientId, victimId, amount) {
        // returns true if successful. Else, returns false
        // first check if botht the recipient and the victim have wallets
        // load the wallets
        const wallets = require('./../../../data/wallets.json');
        if (wallets[recipientId] == undefined)
            return false;
        if (wallets[victimId] == undefined)
            return false;
        const recipientBal = wallets[recipientId];
        const victimBal = wallets[victimId];
        // check if there is enough money to steal
        if (victimBal < amount)
            return false;
        CommandClass.modifyBalance(recipientId, amount);
        CommandClass.modifyBalance(victimId, 0 - amount);
        return true;
    }
    // decorator factory
    /*
     * @param time time of cooldown in ms
     * @returns boolean
     */
    static memberCooldown(time) {
        // the decorator
        return function (target) {
            const oldCommandMain = target.prototype.commandMain;
            target.mostRecentUse = [];
            const newCommandMain = (message, client) => {
                const lastUseTime = target.mostRecentUse[message.author.id]; // could be undefined
                if (lastUseTime == undefined) {
                    oldCommandMain(message, client);
                    target.mostRecentUse[message.author.id] = Date.now();
                    return;
                }
                const difference = Date.now() - lastUseTime;
                if (difference >= time) {
                    target.mostRecentUse[message.author.id] = Date.now();
                    oldCommandMain(message, client);
                }
                else {
                    sendEmbed(message.channel, {
                        title: `That command is on cooldown, ${message.author.tag}.`,
                        color: errorColor_1.default,
                        deleteTimeout: 5000
                    });
                }
            };
            target.prototype.commandMain = newCommandMain;
        };
    }
}
exports.default = CommandClass;
// NOTE: Since CommandClass is defined as a public abstract (async) method, and all subclasses of Command class are
// meant to be static, it must be called as <class>.prototype.commandMain(message, client)
CommandClass.CLIENT_NOT_IN_VC_ERR = errorClasses.CLIENT_NOT_IN_VC_ERR;
CommandClass.CLIENT_NOT_PLAYING_ANYTHING_ERR = errorClasses.CLIENT_NOT_PLAYING_ANYTHING_ERR;
CommandClass.MEMBER_NOT_IN_VC_ERR = errorClasses.MEMBER_NOT_IN_VC_ERR;
CommandClass.PLAYING_SONG_ALREADY_LOOPING_ERR = errorClasses.PLAYING_SONG_ALREADY_LOOPING_ERR;
CommandClass.CLIENT_ALREADY_IN_VC_ERR = errorClasses.CLIENT_ALREADY_IN_VC_ERR;
CommandClass.MEMBER_IN_DIFFERENT_VC_THAN_CLIENT_ERR = errorClasses.MEMBER_IN_DIFFERENT_VC_THAN_CLIENT_ERR;
CommandClass.QUANTATIVE_RANGE_ERR_METACLASS = errorClasses.QUANTATIVE_RANGE_ERR_METACLASS;
CommandClass.MISSING_ARGS_ERR_METACLASS = errorClasses.MISSING_ARGS_ERR_METACLASS;
CommandClass.MEMBER_ALREADY_MUTED_ERR = errorClasses.MEMBER_ALREADY_MUTED_ERR;
CommandClass.MEMBER_ALREADY_UNMUTED_ERR = errorClasses.MEMBER_ALREADY_UNMUTED_ERR;
CommandClass.USER_NOT_PLAYING_A_GAME_ERR = errorClasses.USER_NOT_PLAYING_A_GAME_ERR;
CommandClass.USER_ALREADY_PLAYING_GAME_ERR = errorClasses.USER_ALREADY_PLAYING_GAME_ERR;
// default values
CommandClass.commandCategory = 'misc';
CommandClass.commandDescription = '';
CommandClass.commandSyntax = '';
// can be overriden
CommandClass.aliases = [];
// decorator factory
CommandClass.errorCheck = function (errorsToCheck) {
    const checkErr = (message) => {
        let errPresent = false;
        // instantiated a an object of class of superclass ErrorClass, which checks if the error is present
        for (let i = 0; i < errorsToCheck.length; i++) {
            const errBeingChecked = new errorsToCheck[i](message);
            if (errBeingChecked.checkPresence(message) == true) {
                errPresent = true;
                errBeingChecked.standardHandle(message);
                break;
            }
        }
        return errPresent;
    };
    // the decorator
    return function (commandConstructor) {
        // the nondecorated commandMain method
        const oldCommandMain = commandConstructor.prototype.commandMain;
        const newCommandMain = function (message, client) {
            return __awaiter(this, void 0, void 0, function* () {
                if (checkErr(message) == false) {
                    oldCommandMain(message, client);
                    return false;
                }
                else
                    return true;
            });
        };
        // modify the commandMain method
        commandConstructor.prototype.commandMain = newCommandMain;
    };
};
CommandClass.OWNER = 843888754863374386;
CommandClass.ADMIN = 848001679801712650;
CommandClass.MOD = 843991898708246558;
CommandClass.DEVELOPER = 849334166717071420;
CommandClass.MUTED = 848386357708849152;
CommandClass.STAFF = [CommandClass.OWNER, CommandClass.ADMIN, CommandClass.MOD];
