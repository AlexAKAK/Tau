"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emojis_1 = require("../../../../../utility/emojis");
class greenapple {
    toString() {
        return emojis_1.default.greenApple;
    }
    use(gameInstance) {
        console.log('green apple use');
        console.log(gameInstance.character.health);
        gameInstance.character.incrementHealth();
        console.log(gameInstance.character.health);
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
exports.default = greenapple;
