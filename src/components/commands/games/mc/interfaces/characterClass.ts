import direction from "../enums/direction";
import McGame from "../classes/McGame";
import Item from "./Item";
import emojis from "../../../../utility/emojis";
import mine from "../../../currency/mine";
import stoneSword from "../classes/items/stoneSword";
import woodenPickaxe from "../classes/items/woodenPickaxe";
/*
interface characterClass {
    x: number,
    y: number,
    str: Function,
    underBlock: string,
    health: number, // whole number
    getHearts: Function,
    getNorthBlock: Function,
    getSouthBlock: Function,
    getWestBlock: Function,
    getEastBlock: Function,
    mine: Function,
    getBlockInFront: Function,
    direction: direction,
    inventory: Item[];
    use(slot: number): void,
    craft(item: string): void,
    hunger: number,
    getHungerBar(): string,
    isAlive(): boolean,
    incrementHealth: Function,
    incrementHunger: Function

}
*/

export default class characterClass {
    public x: number = 4
    public y: number = 4
    private gameInstance: McGame

    constructor(gameInstance: McGame) {
        this.gameInstance = gameInstance
        this.gameInstance.character = this
    }

    str() {
        const dirToCharacterEmoji: object = {
            0: emojis.upArrow,
            1: emojis.downArrow,
            2: emojis.leftArrow,
            3: emojis.rightArrow
        }
        console.log(dirToCharacterEmoji[this.direction])
        return dirToCharacterEmoji[this.direction]
    }
    public underBlock = null
    public health = 10
    getHearts() {
        let s = ''
        for (let i = 0; i < this.health; i++) {
            s += emojis.heart
        }
        return s
    }
    /**
     * @returns Item
     */
    incrementHealth(): void {
        this.health += 2       
    }
    incrementHunger(): void {
        this.hunger += 2
    }
    getNorthBlock() {
        if (this.y == 0) return null
        return this.gameInstance.grid[this.y - 1][this.x]
    }
    /**
     * @returns Item
     */
    getSouthBlock() {
        if (this.y == this.gameInstance.WIDTH - 1) return null
        return this.gameInstance.grid[this.y + 1][this.x]
    }
    /**
     * @returns Item
     */
    getWestBlock() {
        if (this.x == 0) return null
        return this.gameInstance.grid[this.y][this.x - 1]
    }
    /**
     * @returns Item
     */
    getEastBlock() {
        if (this.x == this.gameInstance.LENGTH - 1) return null
        return this.gameInstance.grid[this.y][this.x + 1]
    }
    mine(block: Item) {
        block.mine(this.gameInstance)
    }
    getBlockInFront() {
        if(this.direction == direction.FACE_UP) return this.getNorthBlock()
        if(this.direction == direction.FACE_DOWN) return this.getSouthBlock()
        if(this.direction == direction.FACE_LEFT) return this.getWestBlock()
        if(this.direction == direction.FACE_RIGHT) return this.getEastBlock()
        
    }
    direction = direction.FACE_DOWN
    inventory = []
    use(slot: number)  {
        this.inventory[slot].use(this.gameInstance) // pass the gameInstance as the argument
    }
    craft (item: string) {
        if (item == 'wooden_pickaxe') woodenPickaxe.craft(this.gameInstance)
        if (item == 'stone_sword') stoneSword.craft(this.gameInstance)

    }
    hunger =  10
    getHungerBar(): string {
        let s = '';
        for (let i = 0; i < this.hunger; i++) {
            s = `${s}${emojis.chickenDrumstick}`
        }
        if (s == '') return "Dead"
        else return s
    }
    isAlive(): boolean {
        if (this.health == 0) return false
        if (this.hunger == 0) return false
        return true
    }
}