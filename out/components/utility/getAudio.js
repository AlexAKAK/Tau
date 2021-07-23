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
const ytdl = require('ytdl-core');
const { getInfo } = require('ytdl-core');
function getYTDLStream(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const info = yield getInfo(url);
        const seconds = info.videoDetails.lengthSeconds;
        if (seconds == 0)
            return getLiveStream(url);
        else
            return getVideo(url);
    });
}
exports.default = getYTDLStream;
function getVideo(url) {
    // possibly experiment with changing the highWaterMark value to make the video work better.
    const stream = ytdl(url, { filter: "audioonly", highWaterMark: 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 10 });
    return stream;
}
function getLiveStream(url) {
    const stream = ytdl(url);
    return stream;
}
