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
class totalcurrency extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletData = require('./../../../../data/wallets.json');
            let amount = 0;
            for (const userID in walletData) {
                amount += walletData[userID];
            }
            totalcurrency.sendEmbed(message.channel, {
                title: `There are currenty ${amount} TauCoins in circulation.`,
                deleteTimeout: 10000
            });
        });
    }
}
exports.default = totalcurrency;
totalcurrency.commandCategory = 'currency';
totalcurrency.commandDescription = 'Shows the total amount of TauCoin in circulation';
totalcurrency.commandSyntax = 'totalcurrency';
