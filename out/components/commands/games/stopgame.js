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
var stopgame_1;
Object.defineProperty(exports, "__esModule", { value: true });
const CommandClass_1 = require("../../classes/CommandClass");
const ErrorSuperClass_1 = require("../../classes/ErrorSuperClass");
class USER_NOT_PLAYING_A_GAME_ERR extends ErrorSuperClass_1.default {
    checkPresence(message) {
        // first check if a game exists. If it doesn't, return true
        // then, if a game exists, check if <gameobject>.active == false. If false, return true
        // else return false
        const gameExists = message.client.games.has(message.author.id);
        if (!gameExists)
            return true;
        const gameObject = message.client.games.get(message.author.id);
        if (gameObject.active)
            return false;
        else
            return true;
    }
    standardHandle(message) {
        this.sendErrMessage(message.channel, `You are not playing a game, ${message.author.tag}.`);
    }
}
let stopgame = stopgame_1 = class stopgame extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentGame = client.games.get(message.author.id);
            let newGame = currentGame;
            // make the game inactive
            newGame.active = false;
            stopgame_1.sendEmbed(message.channel, {
                title: `Stopped game: ${newGame.gameName}.`,
                color: 'GREEN',
                deleteTimeout: 5000
            });
        });
    }
};
stopgame.commandCategory = 'games';
stopgame.commandDescription = 'Stops the current game';
stopgame.commandSyntax = 'stopgame';
stopgame = stopgame_1 = __decorate([
    stopgame_1.errorCheck([USER_NOT_PLAYING_A_GAME_ERR])
], stopgame);
exports.default = stopgame;
