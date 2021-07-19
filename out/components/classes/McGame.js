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
const emojis_1 = require("../utility/emojis");
const GameSuperClass_1 = require("./GameSuperClass");
const blackSquare = emojis_1.default.blackSquare;
const character = emojis_1.default.character;
const c = new discord_js_1.Client();
class McGame extends GameSuperClass_1.default {
    constructor(_client, _channel) {
        super();
        this.gameName = 'Minecraft';
        this.WIDTH = 7;
        this.LENGTH = 7;
        this.coordinates = [
            [blackSquare, blackSquare, blackSquare, blackSquare, blackSquare, blackSquare, blackSquare],
            [blackSquare, blackSquare, blackSquare, blackSquare, blackSquare, blackSquare, blackSquare],
            [blackSquare, blackSquare, blackSquare, blackSquare, blackSquare, blackSquare, blackSquare],
            [blackSquare, blackSquare, blackSquare, blackSquare, blackSquare, blackSquare, blackSquare],
            [blackSquare, blackSquare, blackSquare, blackSquare, blackSquare, blackSquare, blackSquare],
            [blackSquare, blackSquare, blackSquare, blackSquare, blackSquare, blackSquare, blackSquare],
            [blackSquare, blackSquare, blackSquare, blackSquare, blackSquare, blackSquare, blackSquare]
        ];
        this.characterCoords = {
            x: 4,
            y: 4
        };
        this.contentToFunction = {
            w: () => {
                this.moveCharacter(0, -1);
            },
            a: () => {
                this.moveCharacter(-1, 0);
            },
            s: () => {
                this.moveCharacter(0, 1);
            },
            d: () => {
                this.moveCharacter(1, 0);
            }
        };
        this.coordinates[this.characterCoords.y][this.characterCoords.x] = character;
        this.client = _client;
        this.channel = _channel;
        this.startLoop();
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            const _embed = new discord_js_1.MessageEmbed();
            _embed.addField('Minecraft', this.coordinates, false);
            this.messageInChannel = yield this.channel.send(_embed);
        });
    }
    makeEmbed() {
        const _embed = new discord_js_1.MessageEmbed();
        _embed.addField('Minecraft', this.coordinates, false);
        return _embed;
    }
    startLoop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send();
            this.client.on('message', (message) => __awaiter(this, void 0, void 0, function* () { return this.messageProcedure(message); }));
        });
    }
    messageProcedure(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.active)
                return;
            if (message.content == 'w' || message.content == 'a' || message.content == 's' || message.content == 'd')
                this.handleInput(message.content, message);
        });
    }
    handleInput(content, message) {
        this.contentToFunction[content]();
        if (this.channel.type == 'text') {
            if (!message.deleted)
                message.delete();
        }
    }
    moveCharacter(x, y) {
        this.coordinates[this.characterCoords.y][this.characterCoords.x] = blackSquare;
        this.characterCoords.x += x;
        this.characterCoords.y += y;
        // checking for boundries and fixing them
        if (this.characterCoords.x == -1)
            this.characterCoords.x = this.LENGTH - 1;
        if (this.characterCoords.y == -1)
            this.characterCoords.y = this.WIDTH - 1;
        if (this.characterCoords.x == this.LENGTH)
            this.characterCoords.x = 0;
        if (this.characterCoords.y == this.WIDTH)
            this.characterCoords.y = 0;
        this.coordinates[this.characterCoords.y][this.characterCoords.x] = character;
        this.update();
    }
    update() {
        this.channel.send(this.makeEmbed());
    }
}
exports.default = McGame;
