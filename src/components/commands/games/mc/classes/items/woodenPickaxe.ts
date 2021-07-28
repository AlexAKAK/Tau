import { isThisTypeNode } from "typescript";
import emojis from "../../../../../utility/emojis";
import craftable from "../../interfaces/craftable";
import Item from "../../interfaces/Item";
import blockTypes from "../../enums/blockTypes";
import McGame from "../McGame";
import miningDifficultyEnum from "../../enums/miningDifficultyEnum";
import grass from "./grass";
import nullBlock from "./nullBlock";
import wood from "./wood";

export default class woodenPickaxe implements Item{
    update(gameInstance: McGame): void {
        console.log('updating')
    }
    x: number
    y: number
    toString(): string {
        return emojis.pickaxe
    }
    use(gameInstance: McGame): void {
        const block: Item = gameInstance.character.getBlockInFront()
        if (block.miningDifficulty == miningDifficultyEnum.WOODEN_PICKAXE || block.miningDifficulty == miningDifficultyEnum.STANDARD) block.mine(gameInstance)        
    }
    miningDifficulty: number = miningDifficultyEnum.STANDARD
    blockType: blockTypes = blockTypes.WALK_OVER
    mine(gameInstance: McGame): void {
        
    }
    setChoords (x: number, y: number): woodenPickaxe {
        this.x = x
        this.y = y
        return this
    }
    static craft(gameInstance: McGame) {
        // find the number of wood blocks in the inventory
        let count: number = 0
        let woodIndex: number[] = []
        for (let i = 0; i < gameInstance.character.inventory.length; i++) {
            if (gameInstance.character.inventory[i].toString() == emojis.brownSquare) {
                count++
                woodIndex.push(i)
            }
        }
        console.log(count)
        if (count < 4) return
        // get the first 4 wood indicies
        let woodIndiciesToUse: number[] = []
        for (let i = 0; i < 4; i++) {
            woodIndiciesToUse.push(woodIndex[i])
        }

        gameInstance.character.inventory.push(new woodenPickaxe())
        // remove 4 wood
        for (let i = 0; i < woodIndiciesToUse.length; i++) {
            gameInstance.character.inventory[woodIndiciesToUse[i]] = new nullBlock()
        }
        for (let i = 0; i < gameInstance.character.inventory.length; i++) {
            if (gameInstance.character.inventory[i].blockType == blockTypes.NULL_BLOCK) {
                gameInstance.character.inventory.splice(i, 1)
                i = 0
            }
        }

    }

    
}