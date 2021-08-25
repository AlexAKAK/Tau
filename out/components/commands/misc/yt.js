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
var yt_1;
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CommandClass_1 = require("../../classes/CommandClass");
const textBlock_1 = require("../../utility/embeds/textBlock");
const getYTLinksFromQuery_1 = require("../../utility/getYTLinksFromQuery");
let youtubesearchapi = require('youtube-search-api');
let yt = yt_1 = class yt extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yt_1.removePrefixFromString(message.content, client.PREFIX);
            const links = yield getYTLinksFromQuery_1.default(query);
            let embed = new discord_js_1.MessageEmbed()
                .setTitle(textBlock_1.default(`Search results for ${query}`))
                .setColor('GREEN');
            for (let i = 0; i < links.length; i++) {
                embed.addField(textBlock_1.default(`Result ${i + 1}: ${links[i].title}`), links[i].URL, false);
            }
            message.channel.send(embed);
        });
    }
};
yt.commandCategory = 'misc';
yt.commandDescription = 'Outputs search results for a youtube search';
yt.commandSyntax = 'yt <query>';
yt = yt_1 = __decorate([
    yt_1.errorCheck([
        yt_1.MISSING_ARGS_ERR_METACLASS(2)
    ])
], yt);
exports.default = yt;
