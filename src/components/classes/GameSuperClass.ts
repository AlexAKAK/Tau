import { TextChannel } from "discord.js";
import HydroCarbon from "../..";


// one game can be played per textchannel/dmchannel at a time



export default abstract class GameSuperClass {
    abstract gameName: string
    public active: boolean = true
}