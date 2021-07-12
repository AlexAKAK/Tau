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
const CommandClass_1 = require("../../classes/CommandClass");
const fetch = require('node-fetch');
class meme extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const memeFromReddit = yield meme.getRandomMeme();
            try {
                message.channel.send(memeFromReddit);
            }
            catch (_a) {
                meme.sendEmbed(message.channel, {
                    title: `An unexpected error occured. please try again later.`,
                    color: 'GREEN',
                    deleteTimeout: 5000
                });
            }
        });
    }
    static getRandomMeme() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch('https://www.reddit.com/r/memes/hot.json?limit=10000');
            const resJSON = yield res.json();
            const children = resJSON['data']['children'];
            return meme.randomElement(children)['data']['url_overridden_by_dest'];
        });
    }
    static randomElement(a) {
        return a[Math.floor(Math.random() * a.length)];
    }
}
exports.default = meme;
meme.commandCategory = 'misc';
meme.commandDescription = 'A random meme is sent into the chat';
meme.commandSyntax = 'meme';
