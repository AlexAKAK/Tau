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
class helpstaff extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new discord_js_1.MessageEmbed()
                .addField('mute <user>', 'mutes the user', false)
                .addField('unmute <user>', 'unmutes the user', false)
                .addField('tempmute <user> <duration>', 'temporarily mutes the member for the specified duration', false)
                .addField('tempmutevc <user> <duration>', 'temporarily vc mutes the user for the specifed duration', false)
                .setColor('GREEN')
                .setTimestamp();
            message.channel.send(embed);
        });
    }
}
exports.default = helpstaff;
"BRYSON";
