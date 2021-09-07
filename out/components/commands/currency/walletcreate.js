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
const sendEmbed = require('./../../utility/embeds/sendEmbed');
const fs = require('fs');
class walletcreate extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            //const walletsPath = require('path').resolve(__dirname, './../../../../data/wallets.json')
            const wallets = require('./../../../../data/wallets.json');
            console.log(wallets);
            if (wallets[message.author.id] != undefined)
                sendEmbed(message.channel, {
                    title: `You already have a wallet, ${message.author.tag}.`,
                    color: defaultColor_1.default,
                    deleteTimeout: 5000
                });
            else {
                wallets[message.author.id] == 0;
                Object.assign(wallets, { [message.author.id]: 0 });
                const jsonString = JSON.stringify(wallets);
                //write the data
                console.log(jsonString);
                const logPath = require('path').resolve(__dirname, './../../../../data/wallets.json');
                console.log(logPath);
                fs.writeFile(logPath, jsonString, err => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    //file written successfully
                });
                sendEmbed(message.channel, {
                    title: `Wallet created, ${message.author.tag}!`,
                    color: defaultColor_1.default,
                    deleteTimeout: 5000
                });
            }
        });
    }
}
exports.default = walletcreate;
walletcreate.commandCategory = 'currency';
walletcreate.commandDescription = 'You create a wallet for currency';
walletcreate.commandSyntax = 'walletcreate';
