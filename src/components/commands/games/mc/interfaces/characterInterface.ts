import direction from "../enums/direction";
import McGame from "../classes/McGame";
import Item from "./Item";

export default interface characterInterface {
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
    incrementHealth: Function

}