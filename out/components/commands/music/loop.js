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
var loop_1;
Object.defineProperty(exports, "__esModule", { value: true });
const CommandClass_1 = require("../../classes/CommandClass");
const { CLIENT_NOT_IN_VC_ERR, PLAYING_SONG_ALREADY_LOOPING_ERR } = require('./../../classes/Errors');
const sendEmbed = require('./../../utility/embeds/sendEmbed');
const { red, randomColor } = require('./../../utility/hexColors');
let loop = loop_1 = class loop extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            client.queueMap[message.guild.me.voice.connection.channel.id]['playing']['loop'] = true;
            sendEmbed(message.channel, {
                title: `looping ${client.queueMap[message.guild.me.voice.connection.channel.id]['playing']['songName']}`,
                color: randomColor(),
                deleteTimeout: 5000,
            });
        });
    }
};
loop = loop_1 = __decorate([
    loop_1.errorCheck([
        loop_1.CLIENT_NOT_IN_VC_ERR,
        loop_1.PLAYING_SONG_ALREADY_LOOPING_ERR
    ])
], loop);
exports.default = loop;
