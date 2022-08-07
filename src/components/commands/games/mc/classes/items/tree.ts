import Item from "../../interfaces/Item.js";
import emojis from "../../../../../utility/emojis.js";
import blockTypes from "../../enums/blockTypes.js";
import characterInterface from "../characterClass.js";
import grass from "./grass.js";
import McGame from "../McGame.js";
import seed from "./seed.js";
import wood from "./wood.js";
import miningDifficultyEnum from "../../enums/miningDifficultyEnum.js";
import getRandomInt from "../../../../../utility/getRandomInt.js";
import greenapple from "./greenApple.js";
import placeable from "../../interfaces/placeable.js";
import redApple from "./redApple.js";

export default class tree  extends Item implements placeable {
    miningDifficulty: number = miningDifficultyEnum.STANDARD
    blockType: blockTypes = blockTypes.NOT_WALK_OVER
    x: number
    y: number

    constructor(x?: number, y?: number) {
        super()
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