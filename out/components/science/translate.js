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
var translate_1;
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const mRNAGeneTranscript_1 = require("./../classes/genetics/mRNAGeneTranscript");
const CommandClass_1 = require("../classes/CommandClass");
const aminoAcidSymbolToName_1 = require("./../classes/genetics/aminoAcidSymbolToName");
let translate = translate_1 = class translate extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const seq = translate_1.splitArgsWithoutCommandCall(message)[0];
            const mRNA = new mRNAGeneTranscript_1.default(seq);
            let translationWithNames = [];
            if (!mRNA.valid) {
                translate_1.sendEmbed(message.channel, {
                    title: `Invalid mRNA transcript provided, ${message.author.tag}.`,
                    color: 'RED',
                    deleteTimeout: 5000
                });
                return;
            }
            translationWithNames = mRNA.aminoAcidStrand;
            for (let i = 0; i < translationWithNames.length; i++) {
                const symbol = translationWithNames[i];
                translationWithNames[i] = aminoAcidSymbolToName_1.default[symbol];
            }
            const embed = new discord_js_1.MessageEmbed();
            embed.setColor('BLUE');
            embed.addField('mRNA transcript', mRNA.baseSequence, false),
                embed.addField('Polypeptide chain', mRNA.aminoAcidStrand, false);
            embed.setTimestamp();
            message.channel.send(embed);
        });
    }
};
translate.commandCategory = 'science';
translate.commandDescription = 'You translate a DNA strand';
translate.commandSyntax = 'translate <DNA>';
translate = translate_1 = __decorate([
    translate_1.errorCheck(translate_1.MISSING_ARGS_ERR_METACLASS(2))
], translate);
exports.default = translate;
