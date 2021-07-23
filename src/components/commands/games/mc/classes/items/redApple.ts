import emojis from "../../../../../utility/emojis";
import Item from "../../interfaces/Item";
import blockTypes from "../../enums/blockTypes";
import McGame from "../McGame";

export default class redApple implements Item {
    toString(): string {
        return emojis.redApple
    }
    use(gameInstance: McGame): void {
        gameInstance.character.incrementHealth()
        if (gameInstance.character.health > 10) gameInstance.character.health = 10
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