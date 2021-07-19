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
let stopgame = stopgame_1 = class stopgame extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(client.games);
            const newGame = client.games.get(message.channel.id);
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
    stopgame_1.errorCheck([stopgame_1.USER_NOT_PLAYING_A_GAME_ERR])
], stopgame);
exports.default = stopgame;
