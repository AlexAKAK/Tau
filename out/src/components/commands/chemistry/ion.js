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
var ion_1;
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CommandClass_1 = require("../../classes/CommandClass");
const ErrorClass_1 = require("../../classes/ErrorClass");
const pt_1 = require("./pt");
let ion = ion_1 = class ion extends CommandClass_1.default {
    static createIonObject(name, formula, charge) {
        return { name: name, formula: formula, charge: charge };
    }
    commandMain(message, Client) {
        return __awaiter(this, void 0, void 0, function* () {
            const arg = message.content.toLowerCase().split(' ')[1];
            ion_1.ions.forEach((ionInfo => {
                if (arg == ionInfo['name'] || arg == ionInfo['formula']) {
                    const embed = new discord_js_1.MessageEmbed();
                    embed.setTitle(`Information for ${ionInfo['name']}`);
                    embed.addField(`Formula`, ionInfo['formula'], true);
                    embed.addField('Charge', ionInfo['charge'], true);
                    message.channel.send(embed);
                }
            }));
        });
    }
};
ion.ions = [
    ion_1.createIonObject('acetate', 'C2 H3 O2', -1),
    ion_1.createIonObject('arsenate', 'As O4', -3),
    ion_1.createIonObject('arsenite', 'As O3', -3),
    ion_1.createIonObject('benzoate', 'C6 H5 C O O', -1),
    ion_1.createIonObject('borate', 'B O3', -3),
    ion_1.createIonObject('borate', 'B O3', -3),
    ion_1.createIonObject('bromate', 'Br O3', -1),
    ion_1.createIonObject('carbonate', 'C O3', -2),
    ion_1.createIonObject('chlorate', 'Cl O3', -1)
];
ion.ION_NOT_FOUND_ERR = class ION_NOT_FOUND_ERR extends ErrorClass_1.ErrorClass {
    checkPresence(message) {
        const arg = message.content.toLowerCase().split(' ')[1];
        let present = true;
        ion_1.ions.forEach((ionInfo => {
            if (arg == ionInfo['name'] || arg == ionInfo['formula']) {
                present = false;
            }
        }));
        return present;
    }
    standardHandle(message) {
        pt_1.default.sendErrMessage(message.channel, `You must provide a valid polyatonic ion name or symbol to use the pt command, ${message.author.tag}.`);
    }
};
ion = ion_1 = __decorate([
    ion_1.errorCheck([
        ion_1.MISSING_ARGS_ERR_METACLASS(2),
        ion_1.ION_NOT_FOUND_ERR
    ])
], ion);
exports.default = ion;
