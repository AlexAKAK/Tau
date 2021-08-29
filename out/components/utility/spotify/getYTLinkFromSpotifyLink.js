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
const spdl = require('spdl-core');
const ytsr = require('ytsr');
const ytdl = require('ytdl-core');
const { getInfo } = require('ytdl-core');
const { getData } = require('spotify-url-info');
function getYTLinkFromSpotifyLink(spotifyLink) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('getYTLinkFromSpotifyLink');
        const infos = yield spdl.getInfo(spotifyLink);
        console.log('got info');
        const artistAndName = infos.artist + " " + infos.title;
        const searchResults = yield ytsr(artistAndName, { limit: 1 });
        console.log('got serach resuts from ytsr');
        const ytURL = searchResults.items[0]['url'];
        console.log('got url');
        const audio = ytdl(ytURL);
        console.log('got audio');
        console.log(ytURL);
        const infoy = yield getInfo(ytURL);
        console.log('got infoy');
        console.log(infoy['videoDetails']['title']);
        return {
            audio: audio,
            url: ytURL,
            songName: infoy['videoDetails']['title']
        };
    });
}
exports.default = getYTLinkFromSpotifyLink;
