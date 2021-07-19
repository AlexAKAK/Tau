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
const McGame_1 = require("../../classes/McGame");
const emojis_1 = require("../../utility/emojis");
const blackSquare = emojis_1.default.blackSquare;
const character = emojis_1.default.character;
class mc extends CommandClass_1.default {
    //static activeTextChannels: TextChannel[] = [];
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const gameBoard = new McGame_1.default(client, message.channel);
            //mc.activeTextChannels.push(<TextChannel> message.channel)
            client.addGame(message.author.id, gameBoard);
        });
    }
}
exports.default = mc;
mc.commandCategory = 'games';
mc.commandDescription = 'you play minecraft';
mc.commandSyntax = 'mc';
