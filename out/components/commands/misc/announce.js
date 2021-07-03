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
var announce_1;
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CommandClass_1 = require("../../classes/CommandClass");
let announce = announce_1 = class announce extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            //special
            if (message.author.id != '536235243938643998') {
                message.channel.send(`Shut the fok up.`);
                return;
            }
            // / special
            const spaceIndex = message.content.indexOf(' ');
            const msg = message.content.substring(spaceIndex + 1);
            const embed = new discord_js_1.MessageEmbed();
            embed
                .setColor('BLUE')
                .setDescription(msg)
                .setTitle(`Annoucement by ${message.member.nickname}`)
                .setTimestamp();
            message.channel.send(embed);
            //announce.dmEveryone(embed, message.guild)
        });
    }
};
announce.MISSING_ARGS_ERR_2 = announce_1.MISSING_ARGS_ERR_METACLASS(2);
announce = announce_1 = __decorate([
    announce_1.alias(['a'])
    //@announce.memberCooldown(60000)
    ,
    announce_1.errorCheck([announce_1.MISSING_ARGS_ERR_2])
], announce);
exports.default = announce;
