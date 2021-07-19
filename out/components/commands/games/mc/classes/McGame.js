"use strict";
/*
Add inventory
*/
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
const emojis_1 = require("../../../../utility/emojis");
const GameSuperClass_1 = require("../../../../classes/GameSuperClass");
const getRandomInt_1 = require("../../../../utility/getRandomInt");
const grass_1 = require("./items/grass");
const stone_1 = require("./items/stone");
const tree_1 = require("./items/tree");
const characterEmoji = emojis_1.default.character;
const heart = emojis_1.default.heart;
class McGame extends GameSuperClass_1.default {
    constructor(_client, _channel) {
        super();
        this.gameName = 'Minecraft';
        this.WIDTH = 9;
        this.LENGTH = 9;
        this.grid = [];
        this.character = {
            x: 4,
            y: 4,
            str: function () {
                return characterEmoji;
            },
            underBlock: null,
            health: 10,
            getHearts: function () {
                let s = '';
                for (let i = 0; i < this.health; i++) {
                    s += heart;
                }
                return s;
            }
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
        this.renderTerrain();
        this.renderCharacter();
        this.client = _client;
        this.channel = _channel;
        this.startLoop();
    }
    renderTerrain() {
        // fill with grass
        for (let i = 0; i < this.WIDTH; i++) {
            this.grid.push([]);
            for (let j = 0; j < this.LENGTH; j++) {
                this.grid[i].push(this.generateBlock());
            }
        }
        // add a few gray ones (stone)
        // add a couple trees
    }
    generateBlock() {
        const i = getRandomInt_1.default(10);
        if (i == 1)
            return new tree_1.default();
        else if (i == 2 || i == 3)
            return new stone_1.default();
        else
            return new grass_1.default();
    }
    renderCharacter() {
        this.character.underBlock = this.grid[this.character.y][this.character.x];
        this.grid[this.character.y][this.character.x] = this.character.str();
    }
    makeEmbed() {
        const _embed = new discord_js_1.MessageEmbed();
        _embed.addField(`Minecraft`, this.toString(), false);
        _embed.addField('Standing on', this.character.underBlock, false);
        _embed.addField('x', this.character.x, false);
        _embed.addField('y', this.character.y, false);
        _embed.addField('Health', this.character.getHearts(), false);
        return _embed;
    }
    startLoop() {
        return __awaiter(this, void 0, void 0, function* () {
            this.messageInChannel = yield this.channel.send(this.makeEmbed());
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
            //if (!message.deleted) message.delete()
        }
    }
    moveCharacter(x, y) {
        if (!this.checkIfCanMove(x, y)) {
            this.update();
            return;
        }
        this.grid[this.character.y][this.character.x] = this.character.underBlock;
        this.character.x += x;
        this.character.y += y;
        // checking for boundries and fixing them (old)
        /*
        if (this.character.x == -1) this.character.x = this.LENGTH - 1
        if (this.character.y == -1) this.character.y = this.WIDTH - 1
        if (this.character.x == this.LENGTH) this.character.x = 0
        if (this.character.y == this.WIDTH) this.character.y = 0
        */
        this.character.underBlock = this.grid[this.character.y][this.character.x];
        this.grid[this.character.y][this.character.x] = this.character.str();
        this.update();
    }
    update() {
        this.channel.send(this.makeEmbed());
    }
    checkIfCanMove(x, y) {
        console.log(`x: ${x} y: ${y}`);
        if (this.character.x == 0 && x == -1)
            return false;
        if (this.character.x == this.LENGTH - 1 && x == 1)
            return false;
        if (this.character.y == 0 && y == -1)
            return false;
        if (this.character.y == this.WIDTH - 1 && y == 1)
            return false;
        if (this.grid[this.character.y + y][this.character.x + x].toString() == tree_1.default.prototype.toString())
            return false;
        return true;
    }
}
exports.default = McGame;
