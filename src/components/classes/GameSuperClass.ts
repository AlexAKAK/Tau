import { TextChannel } from "discord.js";
import HydroCarbon from "../..";

export default abstract class GameSuperClass {
    abstract gameName: string
    active: boolean = true
}