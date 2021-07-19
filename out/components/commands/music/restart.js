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
var restart_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmbed = require("./../../utility/embeds/sendEmbed");
const { red, randomColor } = require("./../../utility/hexColors");
const ytdl = require('ytdl-core-discord');
const checkQueueThenHandle = require("./../../utility/checkQueueThenHandle");
const CommandClass_1 = require("../../classes/CommandClass");
let restart = restart_1 = class restart extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const audio = yield ytdl(client.queueMap[message.guild.id].playing.url);
            if (message.guild.me.voice.connection.dispatcher != null)
                message.guild.me.voice.connection.dispatcher.destroy();
            const dispatcher = message.guild.me.voice.connection.play(audio, { type: 'opus', volume: 0.05 });
            dispatcher.on('finish', () => {
                checkQueueThenHandle(message, message.guild.me.voice.connection);
            });
            restart_1.sendEmbed(message.channel, {
                title: `Restarting ${client.queueMap[message.guild.id].playing.songName}`,
                color: randomColor(),
                deleteTimeout: 10000
            });
        });
    }
};
restart.commandCategory = 'music';
restart.commandDescription = 'the currently playing song restarts';
restart.commandSyntax = 'restart';
restart = restart_1 = __decorate([
    restart_1.alias(['r']),
    restart_1.errorCheck([
        restart_1.CLIENT_NOT_PLAYING_ANYTHING_ERR
    ])
], restart);
exports.default = restart;
