"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var mine_1;
Object.defineProperty(exports, "__esModule", { value: true });
const CommandClass_1 = require("../../classes/CommandClass");
const defaultColor_1 = require("../../utility/embeds/defaultColor");
const getRandomInt_1 = require("../../utility/getRandomInt");
const sendEmbed = require('./../../utility/embeds/sendEmbed');
const fs = require('fs');
let mine = mine_1 = class mine extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            // check if the message author is allowed to mine
            /*if (!mine.checkIfMiningIsAllowed(message.author.id)) {
                sendEmbed(message.channel, {
                    title: `${message.author.tag}, you are on mining cooldown.`,
                    color: 'RED',
                    deleteTimeout: 5000
                })
                return;
            }
            */
            const wallets = require('./../../../../data/wallets.json');
            if (wallets[message.author.id] == undefined)
                sendEmbed(message.channel, {
                    title: `${message.author.tag}, you do not have a wallet! You can make one using the walletcreate command.`,
                    color: 'GREEN',
                    deleteTimeout: 5000
                });
            else {
                const amount = getRandomInt_1.default(1000);
                wallets[message.author.id] += amount;
                const logPath = require('path').resolve(__dirname, './../../../../data/wallets.json');
                const jsonString = JSON.stringify(wallets);
                fs.writeFile(logPath, jsonString, err => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    //file written successfully
                });
                sendEmbed(message.channel, {
                    title: `${message.author.tag} mined ${amount} TauCoin`,
                    color: defaultColor_1.default,
                    deleteTimeout: 5000
                });
                mine_1.mostRecentMine[message.author.id] = Date.now();
            }
        });
    }
    static checkIfMiningIsAllowed(messageAuthorId) {
        const lastMineTime = mine_1.mostRecentMine[messageAuthorId]; // could be undefined
        if (lastMineTime == undefined)
            return true;
        const difference = Date.now() - lastMineTime;
        if (difference >= 60000)
            return true;
        else
            return false;
    }
};
mine.commandCategory = 'currency';
mine.commandDescription = 'you mine an amount of currency';
mine.commandSyntax = 'mine';
mine.mostRecentMine = [];
mine = mine_1 = __decorate([
    mine_1.memberCooldown(60000)
], mine);
exports.default = mine;
