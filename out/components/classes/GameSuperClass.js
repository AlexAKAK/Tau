"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// one game can be played per textchannel/dmchannel at a time
class GameSuperClass {
    constructor() {
        this.active = true;
    }
    toString() {
        let s = "";
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                // turn the item into a string for the grid
                s += this.grid[i][j].toString();
            }
            s += '\n';
        }
        return s;
    }
}
exports.default = GameSuperClass;
