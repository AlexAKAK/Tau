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
const discord_js_1 = require("discord.js");
const CommandClass_1 = require("../../classes/CommandClass");
const getYTChannelFromQuery_1 = require("../../utility/getYTChannelFromQuery");
class ytchannel extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = ytchannel.removePrefixAndCommandFromString(message.content, client.PREFIX);
            const channel = yield getYTChannelFromQuery_1.default(query);
            if (channel == null)
                ytchannel.sendErrMessage(message.channel, `There are no channel results for: ${query}`);
            else {
                let embed = new discord_js_1.MessageEmbed();
                embed.setTitle(`Result for: ${query}`);
                embed.addField(`\`\`\`Channel name\`\`\``, `\`\`\`${channel.name}\`\`\``, false);
                embed.addField('\`\`\`URL\`\`\`', `\`\`\`${channel.URL}\`\`\``, false);
                embed.setURL(channel.URL);
                embed.setThumbnail(`https:${channel.thumbnail['thumbnails'][1]['url']}`);
                embed.setTimestamp();
                embed.setColor('GREEN');
                message.channel.send(embed);
            }
        });
    }
}
exports.default = ytchannel;
ytchannel.commandCategory = 'misc';
ytchannel.commandDescription = 'Displays a Youtube channel';
ytchannel.commandSyntax = 'ytchannel <query>';
