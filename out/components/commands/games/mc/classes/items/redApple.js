"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emojis_1 = require("../../../../../utility/emojis");
class redApple {
    toString() {
        return emojis_1.default.redApple;
    }
    use(gameInstance) {
        gameInstance.character.incrementHealth();
        if (gameInstance.character.health > 10)
            gameInstance.character.health = 10;
        gameInstance.character.inventory.splice(Number(gameInstance.mostRecentMessage.content.split(' ')[1]), 1);
    }
    mine(gameInstance) {
    }
    setChoords(x, y) {
    }
    update(gameInstance) {
    }
}
exports.default = redApple;
