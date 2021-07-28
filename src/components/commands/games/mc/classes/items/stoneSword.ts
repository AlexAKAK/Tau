import { Block } from "typescript";
import emojis from "../../../../../utility/emojis";
import blockTypes from "../../enums/blockTypes";
import miningDifficultyEnum from "../../enums/miningDifficultyEnum";
import craftable from "../../interfaces/craftable";
import Item from "../../interfaces/Item";
import McGame from "../McGame";
import nullBlock from "./nullBlock";
import stone from "./stone";
import wood from "./wood";

export default class stoneSword implements Item {
    static craft(gameInstance: McGame) {
        // find the number of wood blocks in the inventory
        let countWood: number = 0
        let countStone: number = 0
        let woodIndex: number[] = []
        let stoneIndex: number[] = []
        for (let i = 0; i < gameInstance.character.inventory.length; i++) {
            if (gameInstance.character.inventory[i].toString() == wood.prototype.toString()) {
                countWood++
                woodIndex.push(i)
            }
        }
        for (let i = 0; i < gameInstance.character.inventory.length; i++) {
            if (gameInstance.character.inventory[i].toString() == stone.prototype.toString()) {
                countStone++
                woodIndex.push(i)
            }
        }
        if (countWood < 4) return
        if (countStone < 4) return

        gameInstance.character.inventory.push(new stoneSword())
        // remove 4 wood
        for (let i = 0; i < 4; i++) {
            gameInstance.character.inventory[woodIndex[i]] = new nullBlock()
        }
        for (let i = 0; i < 4; i++) {
            gameInstance.character.inventory[stoneIndex[i]] = new nullBlock()
        }
        for (let i = 0; i < gameInstance.character.inventory.length; i++) {
            if (gameInstance.character.inventory[i].blockType == blockTypes.NULL_BLOCK) {
                gameInstance.character.inventory.splice(i, 1)
                i = 0
            }
        }
        for (let i = 0; i < gameInstance.character.inventory.length; i++) {
            if (gameInstance.character.inventory[i].blockType == blockTypes.NULL_BLOCK) {
                gameInstance.character.inventory.splice(i, 1)
                i = 0
            }
        }

    }
    [x: string]: any;
    toString(): string {
        return emojis.stone_sword
    }
    use(gameInstance: McGame): void {
        const block: Item = gameInstance.character.getBlockInFront()
        if (block.blockType != blockTypes.MOB) {
            // this will mean that the block is getting mined.
            // Check if the block is able to be mined by a stone sword
            if (block.miningDifficulty == miningDifficultyEnum.STONE_SWORD|| block.miningDifficulty == miningDifficultyEnum.STANDARD ) {
                block.mine(gameInstance)
            }     
        }
        else {

        }

    }
    miningDifficulty: number = null
    blockType: blockTypes = null
    mine(gameInstance: McGame): void {
        
    }
    update(gameInstance: McGame): void {
        
    }
     
}