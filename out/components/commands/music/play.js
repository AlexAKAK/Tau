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
var play_1;
Object.defineProperty(exports, "__esModule", { value: true });
const CommandClass_1 = require("./../../classes/CommandClass");
const { getInfo } = require('ytdl-core');
const ytdl = require('ytdl-core');
const sendEmbed = require('./../../utility/embeds/sendEmbed');
const { red, randomColor } = require('./../../utility/hexColors');
const playAudio = require('./../../utility/playAudio');
const getYoutubeVideoUrlFromKeyword = require('./../../utility/getYoutubeVideoURLFromKeyword');
const getAudio_1 = require("./../../utility/getAudio");
let play = play_1 = class play extends CommandClass_1.default {
    static ytQueueAdd(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = play_1.splitArgs(message);
            const url = args[1];
            const info = yield getInfo(url);
            const audio = getAudio_1.default(url);
            // add the song to the queue of the voice channel
            client.queueMap[message.guild.id]['queue'].push({
                audio: audio,
                url: url,
                songName: info['videoDetails']['title'],
                author: message.author,
            });
            sendEmbed(message.channel, {
                title: `Added to queue: ${info['videoDetails']['title']}`,
                color: randomColor(),
                deleteTimeout: 5000,
            }); // end of sendEmbed()
            return false;
        });
    }
    static ytPlay(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = play_1.splitArgs(message);
            const url = args[1];
            const info = yield getInfo(url);
            if (info == null || info == undefined) {
                sendEmbed(message.channel, {
                    title: 'No videos found',
                    color: 'Red',
                    deleteTimeout: 5000
                });
            }
            const audio = yield getAudio_1.default(url);
            yield playAudio(audio, message.member.voice.channel, url, message);
            client.queueMap[message.guild.id] = {
                playing: {
                    audio: audio,
                    url: url,
                    songName: info['videoDetails']['title'],
                    author: message.author
                },
                queue: [],
            };
            // add the voice channel as a key in client.queueMap  
            return false;
        });
    }
    static kwPlay(message, client, audio, url) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('kwPlay');
            const info = yield getInfo(url);
            if (info == null || info == undefined)
                play_1.handleNoVideoFound(message);
            // playAudio(message.client, audio, message.channel, message.author.voice.channel)
            yield playAudio(audio, message.member.voice.channel, url, message);
            client.queueMap[message.guild.id] = {
                playing: {
                    audio: audio,
                    url: url,
                    songName: info['videoDetails']['title'],
                    author: message.author
                },
                queue: [],
            };
            // add the voice channel as a key in client.queueMap  
            //return false
            // STEP 2c
            return false;
        });
    }
    static kwQueueAdd(message, client, audio, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield getInfo(url);
            // add the song to the queue of the voice channel
            client.queueMap[message.guild.id]['queue'].push({
                audio: audio,
                url: url,
                songName: info['videoDetails']['title'],
                author: message.author
            });
            sendEmbed(message.channel, {
                title: `Added to queue: ${info['videoDetails']['title']}`,
                color: randomColor(),
                deleteTimeout: 5000,
            }); // end of sendEmbed()
            //return false 
        });
    }
    static yt(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            -if connection is defined/nonnull
            -if the dispatcher is defined/nonull
            
            */
            // start working here
            if (message.guild.me.voice.connection.dispatcher != null || message.guild.me.voice.connection.dispatcher != undefined)
                play_1.ytPlay(message, client);
            else
                play_1.ytQueueAdd(message, client);
        });
    }
    static kw(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('kw');
            const keyWords = message.content.substring(message.content.indexOf(' ') + 1);
            const url = yield getYoutubeVideoUrlFromKeyword(keyWords);
            if (url == null) {
                sendEmbed(message.channel, {
                    title: `no videos found, ${message.author.tag}`,
                    color: randomColor(),
                    deleteTimeout: 5000,
                });
                return true;
            }
            const audio = yield getAudio_1.default(url);
            if (message.guild.me.voice.connection.dispatcher == null || message.guild.me.voice.connection.dispatcher == undefined)
                play_1.kwPlay(message, client, audio, url);
            else
                play_1.kwQueueAdd(message, client, audio, url);
        });
    }
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const isLink = message.content.match('http(?:s?):\\/\\/(?:www\\.)?youtu(?:be\\.com\\/watch\?v=|\.be\\/)([\\w\\-\\_]*)(&(amp;)?‌​[\\w\\?‌​=]*)?');
            if (isLink)
                play_1.yt(message, client);
            else
                play_1.kw(message, client);
        });
    }
    static handleNoVideoFound(message) {
        return __awaiter(this, void 0, void 0, function* () {
            sendEmbed(message.channel, {
                title: `No video results found, ${message.author.tag}.`,
                color: 'RED',
                deleteTimeout: 5000
            });
        });
    }
};
play.commandCategory = 'music';
play.commandDescription = 'I play a song by name or youtube link';
play.commandSyntax = 'play <youtube link/search query>';
play.MISSING_ARGS_ERR_2 = play_1.MISSING_ARGS_ERR_METACLASS(2);
play = play_1 = __decorate([
    play_1.alias(['p']),
    play_1.errorCheck([
        play_1.CLIENT_NOT_IN_VC_ERR,
        play_1.MEMBER_NOT_IN_VC_ERR,
        play_1.MISSING_ARGS_ERR_2
        /*, play.MEMBER_IN_DIFFERENT_VC_THAN_CLIENT_ERR*/
    ])
], play);
exports.default = play;
