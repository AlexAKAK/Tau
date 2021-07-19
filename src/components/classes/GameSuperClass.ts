import { TextChannel } from "discord.js";
import HydroCarbon from "../..";


// one game can be played per textchannel/dmchannel at a time



export default abstract class GameSuperClass {
    abstract gameName: string
    public active: boolean = true
    abstract LENGTH: number;
    abstract WIDTH: number;
    abstract grid: string[][];


    toString(): string {
        let s: string = ""
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                s += this.grid[i][j]
            }
            s += '\n'
        }
        return s
    }




}