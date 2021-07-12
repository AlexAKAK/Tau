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
var gif_1;
Object.defineProperty(exports, "__esModule", { value: true });
const Tenor = require("tenorjs").client({
    "Key": 'C6NWL8O6EVFW',
    "Filter": "off",
    "Locale": "en_US",
    "MediaFilter": "minimal",
    "DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});
const CommandClass_1 = require("../../classes/CommandClass");
let gif = gif_1 = class gif extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const argsList = message.content.split(' ');
            let keywords = "";
            for (let i = 1; i < argsList.length; i++)
                keywords = `${keywords} ${argsList[i]}`;
            const results = yield Tenor.Search.Query(keywords, "1");
            results.forEach(post => {
                message.channel.send(post['itemurl']);
                console.log(post['itemurl']);
            });
        });
    }
};
gif.commandCategory = 'misc';
gif.commandDescription = 'A gif is sent into the chat';
gif.commandSyntax = 'gif <search query>';
gif.fetch = require('node-fetch');
gif.MISSING_ARGS_ERR_2 = gif_1.MISSING_ARGS_ERR_METACLASS(2);
gif = gif_1 = __decorate([
    gif_1.errorCheck([
        gif_1.MISSING_ARGS_ERR_2
    ])
], gif);
exports.default = gif;
