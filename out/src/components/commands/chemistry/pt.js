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
var pt_1;
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ErrorClass_1 = require("../../classes/ErrorClass");
const CommandClass_1 = require("../../classes/CommandClass");
"bryson on top";
const periodicTable = require('periodic-table');
let pt = pt_1 = class pt extends CommandClass_1.default {
    getInfo(search) {
        console.log(search);
        const elementFromName = periodicTable.elements[search];
        const elementFromSymbol = periodicTable.symbols[search];
        const elementFromAtomicNumber = periodicTable.numbers[Number(search)];
        console.log(elementFromAtomicNumber);
        console.log(elementFromName);
        console.log(elementFromSymbol);
        if (elementFromName != undefined)
            return elementFromName;
        else if (elementFromSymbol != undefined)
            return elementFromSymbol;
        else if (elementFromAtomicNumber != undefined)
            return elementFromAtomicNumber;
        else
            return undefined;
    }
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            {
            atomicNumber: 10,
            symbol: 'Ne',
            name: 'Neon',
            atomicMass: '20.1797(6)',
            cpkHexColor: 'B3E3F5',
            electronicConfiguration: '[He] 2s2 2p6',
            electronegativity: '',
            atomicRadius: 69,
            ionRadius: '',
            vanDelWaalsRadius: 154,
            ionizationEnergy: 2081,
            electronAffinity: 0,
            oxidationStates: '',
            standardState: 'gas',
            bondingType: 'atomic',
            meltingPoint: 25,
            boilingPoint: 27,
            density: 0.0009,
            groupBlock: 'noble gas',
            yearDiscovered: 1898
            }
            */
            console.log(message.content.split(' '));
            const element = pt_1.prototype.getInfo(message.content.split(' ')[1]);
            const embed = new discord_js_1.MessageEmbed();
            const name = element['name'];
            const info = {
                symbol: element['symbol'],
                atomicNumber: element['atomicNumber'],
                AtomicMass: element['atomicMass'],
                electronicConfiguration: element['electronicConfiguration'],
                atomicRadius: element['atomicRadius'],
                standardState: element['standardState'],
                groupBlock: element['groupBlock']
            };
            embed.setTitle(`Information for ${name}`);
            for (let [key, value] of Object.entries(info)) {
                if (value != '' && value != undefined && value != null)
                    embed.addField(key, value, true);
            }
            for (let [key, value] of Object.entries(pt_1.groupBlockColor)) {
                if (info['groupBlock'] == key)
                    embed.setColor(value);
            }
            embed.setTimestamp();
            message.channel.send(embed);
        });
    }
};
/* 3 possibilities for input
    -a whole number between 1 and 118
    -a periodic symbol
    -an element name
*/
// fix the error for when an integer is inputted
pt.MISSING_ARGS_ERR_2 = ErrorClass_1.MISSING_ARGS_ERR_METACLASS(2);
pt.groupBlockColor = {
    'alkali metal': '6462a1',
    'alkaline earth metal': '6b7dc2',
    'transition metal': '6db4c2',
    'metalloid': '74cc90',
    'nonmetal': '9fd474',
    'halogen': 'dae37b',
    'noble gas': 'd6a772',
    'lanthanoid': 'db7676',
    'actinoid': 'db7676',
    'post-transition metal': 'f01111'
};
pt.ELEMENT_NOT_FOUND_ERR = class ELEMENT_NOT_FOUND_ERR extends ErrorClass_1.ErrorClass {
    checkPresence(message) {
        console.log(pt_1.prototype.getInfo(pt_1.splitArgs(message)[1]));
        if (!pt_1.prototype.getInfo(pt_1.splitArgs(message)[1]))
            return true;
        else
            return false;
    }
    standardHandle(message) {
        pt_1.sendErrMessage(message.channel, `You must provide a valid element name, element symbol, or atomic number to use the pt command, ${message.author.tag}.`);
    }
};
pt = pt_1 = __decorate([
    pt_1.errorCheck([
        pt_1.MISSING_ARGS_ERR_2,
        pt_1.ELEMENT_NOT_FOUND_ERR
    ])
], pt);
exports.default = pt;
