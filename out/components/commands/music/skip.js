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
var skip_1;
Object.defineProperty(exports, "__esModule", { value: true });
const CommandClass_1 = require("../../classes/CommandClass");
const checkQueueThenHandle = require('./../../utility/checkQueueThenHandle');
const sendEmbed = require('./../../utility/embeds/sendEmbed');
const { red, lightBlue } = require('./../../utility/hexColors');
// C:/Users/alexk/Desktop/coding projects/bryson/bryson bot 9/src/components/utility/checkQueueThenHandle.js
/*async function skip(message) {
    // if no err
    if (checkErr(message) == false) {
        const connection = message.guild.me.voice.connection
        const dispatcher = connection.dispatcher
        sendEmbed(message.channel, {
            title: `Skipped ${message.client.queueMap[message.guild.me.voice.channel.id]['playing']['songName']}`,
            color: lightBlue,
            deleteTimeout: 5000,
        })
        // make the song not loop
        message.client.queueMap[message.guild.voice.connection.channel.id]['playing']['loop'] = false

        await dispatcher.destroy()
        checkQueueThenHandle(message, connection)
    }

    return checkErr(message)

}*/
let skip = skip_1 = class skip extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = message.guild.me.voice.connection;
            const dispatcher = connection.dispatcher;
            sendEmbed(message.channel, {
                title: `Skipped ${client.queueMap[message.guild.id]['playing']['songName']}`,
                color: lightBlue,
                deleteTimeout: 5000,
            });
            // make the song not loop
            client.queueMap[message.guild.id]['playing']['loop'] = false;
            dispatcher.destroy();
            checkQueueThenHandle(message, connection);
        });
    }
};
skip = skip_1 = __decorate([
    skip_1.alias(['s']),
    skip_1.errorCheck([
        skip_1.CLIENT_NOT_IN_VC_ERR,
        skip_1.CLIENT_NOT_PLAYING_ANYTHING_ERR
    ])
], skip);
exports.default = skip;
