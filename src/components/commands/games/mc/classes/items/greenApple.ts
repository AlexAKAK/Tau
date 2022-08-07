import emojis from "../../../../../utility/emojis.js";
import Item from "../../interfaces/Item.js";
import blockTypes from "../../enums/blockTypes.js";
import McGame from "../McGame.js";

export default class greenapple extends Item {
    toString(): string {
        return emojis.greenApple
    }
    use(gameInstance: McGame): void {
        console.log('green apple use')
        gameInstance.character.incrementHunger()
        if (gameInstance.character.hunger > 10) gameInstance.character.hunger = 10
        gameInstance.character.inventory.splice(Number(gameInstance.mostRecentMessage.content.split(' ')[1]), 1)
    }
    miningDifficulty: number;
    blockType: blockTypes;
    mine(gameInstance: McGame): void {

    }
    setChoords(x: number, y: number) {

    }
    update(gameInstance: McGame): void {

    }
    
}