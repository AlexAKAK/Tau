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
var stop_1;
Object.defineProperty(exports, "__esModule", { value: true });
const textFormatting = require('./../../utility/textFormatting');
const sendEmbed = require('./../../utility/embeds/sendEmbed');
const { red, green, lightBlue } = require('./../../utility/hexColors');
const CommandClass_1 = require("../../classes/CommandClass");
let stop = stop_1 = class stop extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            // clear the server's queue
            client.queueMap.delete(message.guild.me.voice.connection.channel.id);
            message.guild.me.voice.connection.dispatcher.destroy();
            // send the embed
            sendEmbed(message.channel, {
                color: lightBlue,
                title: `I stopped playing, ${message.author.tag}.`,
                deleteTimeout: 5000,
            });
            return false;
        });
    }
};
stop = stop_1 = __decorate([
    stop_1.errorCheck([
        stop_1.CLIENT_NOT_IN_VC_ERR,
        stop_1.CLIENT_NOT_PLAYING_ANYTHING_ERR
    ])
], stop);
exports.default = stop;
