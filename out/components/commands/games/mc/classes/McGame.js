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
const blockTypes_1 = require("./blockTypes");
const direction_1 = require("./direction");
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
                const dirToCharacterEmoji = {
                    0: emojis_1.default.upArrow,
                    1: emojis_1.default.downArrow,
                    2: emojis_1.default.leftArrow,
                    3: emojis_1.default.rightArrow
                };
                console.log(dirToCharacterEmoji[this.direction]);
                return dirToCharacterEmoji[this.direction];
            },
            underBlock: null,
            health: 10,
            getHearts: function () {
                let s = '';
                for (let i = 0; i < this.health; i++) {
                    s += heart;
                }
                return s;
            },
            /**
             * @returns Item
             */
            getNorthBlock: () => {
                if (this.character.y == 0)
                    return null;
                return this.grid[this.character.y - 1][this.character.x];
            },
            /**
             * @returns Item
             */
            getSouthBlock: () => {
                if (this.character.y == this.WIDTH - 1)
                    return null;
                return this.grid[this.character.y + 1][this.character.x];
            },
            /**
             * @returns Item
             */
            getWestBlock: () => {
                if (this.character.x == 0)
                    return null;
                return this.grid[this.character.y][this.character.x - 1];
            },
            /**
             * @returns Item
             */
            getEastBlock: () => {
                if (this.character.x == this.LENGTH - 1)
                    return null;
                return this.grid[this.character.y][this.character.x + 1];
            },
            mine: (block) => {
                block.mine(this);
            },
            getBlockInFront: () => {
                if (this.character.direction == direction_1.default.FACE_UP)
                    return this.character.getNorthBlock();
                if (this.character.direction == direction_1.default.FACE_DOWN)
                    return this.character.getSouthBlock();
                if (this.character.direction == direction_1.default.FACE_LEFT)
                    return this.character.getWestBlock();
                if (this.character.direction == direction_1.default.FACE_RIGHT)
                    return this.character.getEastBlock();
            },
            direction: direction_1.default.FACE_DOWN
        };
        this.directionToString = {
            0: 'north',
            1: 'south',
            2: 'west',
            3: 'east'
        };
        this.contentToFunction = {
            w: () => {
                this.character.direction = direction_1.default.FACE_UP;
                this.moveCharacter(0, -1);
            },
            a: () => {
                this.character.direction = direction_1.default.FACE_LEFT;
                this.moveCharacter(-1, 0);
            },
            s: () => {
                this.character.direction = direction_1.default.FACE_DOWN;
                this.moveCharacter(0, 1);
            },
            d: () => {
                this.character.direction = direction_1.default.FACE_RIGHT;
                this.moveCharacter(1, 0);
            },
            mine: () => {
                const block = this.character.getBlockInFront();
                this.character.mine(block);
            },
            rotate180: () => {
                const conversion = {
                    0: 1,
                    1: 0,
                    2: 3,
                    3: 2
                };
                const currentDirection = this.character.direction;
                this.character.direction = conversion[currentDirection];
                this.grid[this.character.y][this.character.x] = this.character.str();
            },
            rotate90: () => {
                const conversion = {
                    0: 3,
                    1: 2,
                    2: 0,
                    3: 1
                };
                const currentDirection = this.character.direction;
                this.character.direction = conversion[currentDirection];
                this.grid[this.character.y][this.character.x] = this.character.str();
            },
            rotate270: () => {
                const conversion = {
                    0: 2,
                    1: 3,
                    2: 1,
                    3: 0
                };
                const currentDirection = this.character.direction;
                this.character.direction = conversion[currentDirection];
                this.grid[this.character.y][this.character.x] = this.character.str();
            }
        };
        this.renderTerrain();
        this.renderCharacterInit();
        this.client = _client;
        this.channel = _channel;
        this.startLoop();
    }
    renderTerrain() {
        // fill with grass
        for (let i = 0; i < this.WIDTH; i++) {
            this.grid.push([]);
            for (let j = 0; j < this.LENGTH; j++) {
                this.grid[i].push(this.generateBlock().setChoords(j, i));
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
    renderCharacterInit() {
        this.character.underBlock = this.grid[this.character.y][this.character.x];
        this.grid[this.character.y][this.character.x] = this.character.str();
    }
    updateCharacter() {
        this.grid[this.character.y][this.character.x] = this.character.str();
    }
    makeEmbed() {
        const _embed = new discord_js_1.MessageEmbed();
        _embed.addField(`Minecraft`, this.toString(), false);
        _embed.addField('Standing on', this.character.underBlock, false);
        _embed.addField('x', this.character.x, false);
        _embed.addField('y', this.character.y, false);
        _embed.addField('Health', this.character.getHearts(), false);
        _embed.addField('Facing', this.directionToString[this.character.direction], false);
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
            if (this.contentToFunction[message.content] != undefined)
                this.handleInput(message.content, message);
        });
    }
    handleInput(content, message) {
        this.contentToFunction[content]();
        if (this.channel.type == 'text') {
            //if (!message.deleted) message.delete()
        }
        this.update();
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
    }
    update() {
        this.updateCharacter();
        this.channel.send(this.makeEmbed());
    }
    checkIfCanMove(x, y) {
        // trying to move outside of the map
        if (this.character.x == 0 && x == -1)
            return false;
        if (this.character.x == this.LENGTH - 1 && x == 1)
            return false;
        if (this.character.y == 0 && y == -1)
            return false;
        if (this.character.y == this.WIDTH - 1 && y == 1)
            return false;
        if (this.grid[this.character.y + y][this.character.x + x].blockType == blockTypes_1.default.NOT_WALK_OVER)
            return false;
        return true;
    }
}
exports.default = McGame;
