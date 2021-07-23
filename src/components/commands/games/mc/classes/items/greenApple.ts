import emojis from "../../../../../utility/emojis";
import Item from "../../interfaces/Item";
import blockTypes from "../../enums/blockTypes";
import McGame from "../McGame";

export default class greenapple implements Item {
    toString(): string {
        return emojis.greenApple
    }
    use(gameInstance: McGame): void {
        console.log('green apple use')
        console.log(gameInstance.character.health)
        gameInstance.character.incrementHealth()
        console.log(gameInstance.character.health)
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