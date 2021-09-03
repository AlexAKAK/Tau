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
var ytchannel_1;
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CommandClass_1 = require("../../classes/CommandClass");
const defaultColor_1 = require("../../utility/embeds/defaultColor");
const getYTChannelFromQuery_1 = require("../../utility/getYTChannelFromQuery");
let ytchannel = ytchannel_1 = class ytchannel extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = ytchannel_1.removePrefixAndCommandFromString(message.content, client.PREFIX);
            const channel = yield getYTChannelFromQuery_1.default(query);
            if (channel == null)
                ytchannel_1.sendErrMessage(message.channel, `There are no channel results for: ${query}`);
            else {
                let embed = new discord_js_1.MessageEmbed();
                embed.setTitle(`Result for: ${query}`);
                embed.addField(`\`\`\`Channel name\`\`\``, `\`\`\`${channel.name}\`\`\``, false);
                embed.addField('\`\`\`URL\`\`\`', `\`\`\`${channel.URL}\`\`\``, false);
                embed.setURL(channel.URL);
                embed.setThumbnail(`https:${channel.thumbnail['thumbnails'][1]['url']}`);
                embed.setTimestamp();
                embed.setColor(defaultColor_1.default);
                message.channel.send(embed);
            }
        });
    }
};
ytchannel.commandCategory = 'misc';
ytchannel.commandDescription = 'Displays a Youtube channel';
ytchannel.commandSyntax = 'ytchannel <query>';
ytchannel = ytchannel_1 = __decorate([
    ytchannel_1.errorCheck([
        ytchannel_1.MISSING_ARGS_ERR_METACLASS(2)
    ])
], ytchannel);
exports.default = ytchannel;
