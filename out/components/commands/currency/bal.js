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
const CommandClass_1 = require("../../classes/CommandClass");
const defaultColor_1 = require("../../utility/embeds/defaultColor");
//import readJson from "../../utility/readJson";
const sendEmbed = require('./../../utility/embeds/sendEmbed');
const fs = require('fs');
//import readJson from "../../utility/readJson";
class bal extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallets = require('./../../../../data/wallets.json');
            console.log(wallets);
            const args = message.content.split(' ');
            args.shift();
            if (wallets[message.author.id] == undefined)
                sendEmbed(message.channel, {
                    title: `${message.author.tag}, you do not have a wallet! You can make one using the walletcreate command.`,
                    color: defaultColor_1.default,
                    deleteTimeout: 5000
                });
            else if (args.length == 0)
                sendEmbed(message.channel, {
                    title: `${message.author.tag}'s balance is ${wallets[message.author.id]} AK Coin.`,
                    color: defaultColor_1.default,
                    deleteTimeout: 5000
                });
            else if (args.length == 1) {
                const playerId = args[0].substring(3).replace('>', '');
                const member = bal.getMember(playerId, message.guild);
                const balance = wallets[member.user.id];
                if (balance == undefined)
                    sendEmbed(message.channel, {
                        title: `${member.user.tag} does not have a wallet.`,
                        color: defaultColor_1.default,
                        deleteTimeout: 5000
                    });
                else
                    sendEmbed(message.channel, {
                        title: `${member.user.tag}'s balance is ${wallets[member.user.id]} AK Coin.`,
                        color: defaultColor_1.default,
                        deleteTimeout: 5000
                    });
            }
        });
    }
}
exports.default = bal;
bal.commandCategory = 'currency';
bal.commandDescription = 'shows your currency balance';
bal.commandSyntax = 'bal <?user>';
