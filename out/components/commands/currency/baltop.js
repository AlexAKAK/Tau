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
class baltop extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let topUserID;
            let topbal = -1;
            const walletData = require('./../../../../data/wallets.json');
            for (const userID in walletData) {
                if (walletData[userID] > topbal) {
                    topbal = walletData[userID];
                    topUserID = userID;
                }
            }
            const topUser = yield client.users.fetch(topUserID);
            baltop.sendEmbed(message.channel, {
                title: `The user with the highest balance is ${topUser.tag}, with ${topbal} TauCoin.`
            });
        });
    }
}
exports.default = baltop;
baltop.commandDescription = 'Shows the user with the highest balance';
baltop.commandSyntax = 'baltop';
