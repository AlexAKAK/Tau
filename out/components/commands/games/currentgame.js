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
class currentgame extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (client.games.has(message.channel.id) == false || client.games.get(message.channel.id).active == false) {
                currentgame.sendEmbed(message.channel, {
                    title: `There are no games being played in this channel, ${message.author.tag}.`,
                    color: 'YELLOW',
                    deleteTimeout: 5000
                });
            }
            else {
                const game = client.games.get(message.channel.id);
                currentgame.sendEmbed(message.channel, {
                    title: `Playing: ${game.gameName}`,
                    color: 'GREEN',
                    deleteTimeout: 5000
                });
            }
        });
    }
}
exports.default = currentgame;
currentgame.commandCategory = 'games';
currentgame.commandDescription = 'The current game is displayed';
currentgame.commandSyntax = 'currentgame';
