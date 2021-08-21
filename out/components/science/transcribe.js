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
var transcribe_1;
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CommandClass_1 = require("../classes/CommandClass");
let transcribe = transcribe_1 = class transcribe extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let DNA = transcribe_1.splitArgsWithoutCommandCall(message)[0];
            let RNA = DNA;
            for (let i = 0; i < DNA.length; i++) {
                if (DNA.charAt(i) != 'a' && DNA.charAt(i) != 't' && DNA.charAt(i) != 'c' && DNA.charAt(i) != 'g') {
                    transcribe_1.sendEmbed(message.channel, {
                        title: `Invalid DNA strand provided, ${message.author.tag}.`,
                        color: 'RED',
                        deleteTimeout: 5000
                    });
                    return;
                }
            }
            console.log(DNA);
            RNA = RNA.replace(/a/g, 'u');
            RNA = RNA.replace(/t/g, 'a');
            RNA = RNA.replace(/c/g, 'x');
            RNA = RNA.replace(/g/g, 'c');
            RNA = RNA.replace(/x/g, 'g');
            const embed = new discord_js_1.MessageEmbed();
            embed.setColor('BLUE');
            embed.addField('DNA strand', DNA, false);
            embed.addField('mRNA transcript', RNA, false);
            embed.setTimestamp();
            message.channel.send(embed);
        });
    }
};
transcribe.commandCategory = 'science';
transcribe.commandDescription = 'You transcribe an RNA strand';
transcribe.commandSyntax = 'transcribe <RNA>';
transcribe = transcribe_1 = __decorate([
    transcribe_1.errorCheck([transcribe_1.MISSING_ARGS_ERR_METACLASS(2)])
], transcribe);
exports.default = transcribe;
