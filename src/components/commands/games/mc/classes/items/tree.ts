import Item from "../../interfaces/Item";
import emojis from "../../../../../utility/emojis";
import blockTypes from "../../enums/blockTypes";
import characterInterface from "../../interfaces/characterInterface";
import grass from "./grass";
import McGame from "../McGame";
import seed from "./seed";
import wood from "./wood";
import miningDifficultyEnum from "../../enums/miningDifficultyEnum";
import getRandomInt from "../../../../../utility/getRandomInt";
import greenapple from "./greenapple";
import placeable from "../../interfaces/placeable";
import redApple from "./redApple";

export default class tree implements Item, placeable {
    miningDifficulty: number = miningDifficultyEnum.STANDARD
    blockType: blockTypes = blockTypes.NOT_WALK_OVER
    x: number
    y: number

    constructor(x?: number, y?: number) {
        if (x != undefined && y != undefined) {
            this.x = x
            this.y = y
        }
    }

    setChoords (x: number, y: number): tree {
        this.x = x
        this.y = y
        return this
    }

    toString(): string {
        return emojis.tree
    }
    use(gameInstance: McGame): void {
        
    }
    mine(gameInstance: McGame): void {
        gameInstance.grid[this.y][this.x] = new grass().setChoords(this.x, this.y)
        gameInstance.character.inventory.push(new seed())
        gameInstance.character.inventory.push(new wood())
        gameInstance.character.inventory.push(new wood())
        const i = getRandomInt(3)
        // a change of getting a green apple on mining the tree
        gameInstance.character.inventory.push(new greenapple())
        gameInstance.character.inventory.push(new redApple())
    }
    update(gameInstance: McGame): void {
        console.log('updating')
    }
}