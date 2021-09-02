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
const getYTLinkFromSpotifyLink_1 = require("../../utility/spotify/getYTLinkFromSpotifyLink");
const { getData } = require('spotify-url-info');
const spdl = require('spdl-core');
const ytsr = require('ytsr');
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
                yield play_1.ytPlay(message, client);
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
    static spotifyPlay(message, client, audio, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const infoy = yield getInfo(url);
            const songData = yield getYTLinkFromSpotifyLink_1.default(url);
            if (infoy == null || infoy == undefined)
                play_1.handleNoVideoFound(message);
            client.queueMap[message.guild.id] = {
                playing: {
                    audio: audio,
                    url: songData['url'],
                    songName: infoy['videoDetails']['title'],
                    author: message.author
                },
                queue: [],
            };
        });
    }
    static spotifyAdd(message, client, audio, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield getInfo(url);
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
    static spotify(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const spotifyURL = play_1.removePrefixAndCommandFromString(message.content, client.PREFIX);
            console.log(spotifyURL);
            const firstSearch = yield getData(spotifyURL);
            if (firstSearch['tracks'] != undefined) {
                const playlistName = firstSearch['name'];
                let trackUrls = [];
                for (let i = 0; i < firstSearch['tracks']['items'].length; i++) {
                    if (firstSearch['tracks']['items'][i]['track'] == null) { }
                    else
                        trackUrls.push(firstSearch['tracks']['items'][i]['track']['external_urls']['spotify']);
                }
                yield play_1.spotifyPlaylist(message, client, trackUrls, playlistName);
                return;
            }
            //
            // change this back to the original link in a bit //
            //
            const infos = yield spdl.getInfo(spotifyURL);
            console.log(infos);
            const artistAndName = infos.artist + " " + infos.title;
            const searchResults = yield ytsr(artistAndName, { limit: 1 });
            console.log(searchResults);
            const ytURL = searchResults.items[0].url;
            const audio = ytdl(ytURL);
            console.log(`dispatcher ${message.guild.me.voice.connection.dispatcher}`);
            if (message.guild.me.voice.connection.dispatcher == null || message.guild.me.voice.connection.dispatcher == undefined)
                play_1.kwPlay(message, client, audio, ytURL);
            else
                play_1.kwQueueAdd(message, client, audio, ytURL);
        });
    }
    static spotifyPlaylist(message, client, tracks, playlistName) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('spotify playlist');
            console.log(tracks);
            let playing = false;
            for (let i = 0; i < tracks.length; i++) {
                if (message.guild.me.voice.connection.dispatcher == null && playing == false) {
                    console.log('dispatcher is null');
                    const songData = yield getYTLinkFromSpotifyLink_1.default(tracks[i]);
                    client.queueMap[message.guild.id] = {
                        playing: {
                            url: songData['url'],
                            author: message.author,
                            audio: songData['audio'],
                            songName: songData['songName'],
                            playlistName: playlistName
                        },
                        queue: [],
                    };
                    playing = true;
                    yield playAudio(songData['audio'], message.member.voice.channel, songData['url'], message);
                }
                else {
                    client.queueMap[message.guild.id]['queue'].push({
                        url: tracks[i],
                        type: 'spotify',
                        author: message.author,
                        playlistName: playlistName
                    });
                    // add back later
                    const length = client.queueMap[message.guild.id]['queue'].length;
                }
            }
            /*
            for (let i = 0; i < tracks.length; i++) {
                const audio = ytdl(ytTracks[i])
                if (message.guild.me.voice.connection.dispatcher == null || message.guild.me.voice.connection.dispatcher == undefined) play.kwPlay(message, client, audio, ytTracks[i])
                else play.kwQueueAdd(message, client, audio, ytTracks[i])
                
            }
            */
        });
    }
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const isYTLink = message.content.match('http(?:s?):\\/\\/(?:www\\.)?youtu(?:be\\.com\\/watch\?v=|\.be\\/)([\\w\\-\\_]*)(&(amp;)?‌​[\\w\\?‌​=]*)?');
            const re = /((open|play)\.spotify\.com\/)/;
            const isSpotifyLink = re.test(play_1.removePrefixAndCommandFromString(message.content, client.PREFIX));
            if (isYTLink)
                play_1.yt(message, client);
            else if (isSpotifyLink)
                play_1.spotify(message, client);
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
    static loadSong(message, client, song) {
        return __awaiter(this, void 0, void 0, function* () {
            if (song['type'] == 'spotify') {
                const data = yield getYTLinkFromSpotifyLink_1.default(song['url']);
                song['url'] = data['url'];
                song['audio'] = data['audio'];
                song['songName'] = data['songName'];
                song['type'] = undefined;
            }
        });
    }
    static loadAllSongs(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < client.queueMap[message.guild.id]['queue'].length; i++) {
                if (client.queueMap[message.guild.id]['queue'][i]['type'] == 'spotify') {
                    const data = yield getYTLinkFromSpotifyLink_1.default(client.queueMap[message.guild.id]['queue'][i]['url']);
                    client.queueMap[message.guild.id]['queue'][i]['url'] = data['url'];
                    client.queueMap[message.guild.id]['queue'][i]['audio'] = data['audio'];
                    client.queueMap[message.guild.id]['queue'][i]['songName'] = data['songName'];
                    client.queueMap[message.guild.id]['queue'][i]['type'] = undefined;
                }
            }
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
