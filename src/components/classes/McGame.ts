/*
Add inventory
*/



import discordButtons from "discord-buttons"
import { DMChannel, Message, MessageEmbed, TextChannel, Client } from "discord.js"
import HydroCarbon from "../.."
import emojis from "../utility/emojis"
import GameSuperClass from "./GameSuperClass"
import getRandomInt from "../utility/getRandomInt"


const grass = emojis.greenSquare
const stone = emojis.blackSquare
const characterEmoji = emojis.character
const tree = emojis.tree

type block = string

interface coordinatePair {
    x: number,
    y: number
}

interface characterInterface {
    x: number,
    y: number,
    str: Function,
    underBlock: block
}

export default class McGame extends GameSuperClass{
    public gameName: string = 'Minecraft'
    private client: HydroCarbon
    private channel: TextChannel|DMChannel
    private messageInChannel: Message
    WIDTH: number = 14
    LENGTH: number = 14

    grid = []

    private character: characterInterface = {
        x: 4,
        y: 4,
        str: function() {
            return characterEmoji
        },
        underBlock: null
    }

    constructor(_client: HydroCarbon, _channel: TextChannel) {
        super()
        this.renderTerrain()
        this.renderCharacter()
        this.client = _client
        this.channel = _channel
        this.startLoop()
    }

    private renderTerrain(): void {
        // fill with grass
        for (let i = 0; i < this.WIDTH; i++) {
            this.grid.push([])
            for (let j = 0; j < this.LENGTH; j++) {
                this.grid[i].push(this.generateBlock())
            }
        }
        // add a few gray ones (stone)
        // add a couple trees
    }

    private generateBlock(): block {
        const i = getRandomInt(10)
        if (i == 1) return tree
        else if (i == 2 || i == 3) return stone
        else return grass
    }

    private renderCharacter(): void {
        this.character.underBlock = this.grid[this.character.y][this.character.x]
        this.grid[this.character.y][this.character.x] = this.character.str()
    }


    async send(): Promise<void> {
        const _embed = new MessageEmbed()
        _embed.addField(`Minecraft`, this.toString() + `\n\nStanding on: ${this.character.underBlock}\n x: ${this.character.x}\ny: ${this.character.y}` , false)
        this.messageInChannel = await this.channel.send(_embed)
    }

    makeEmbed(): MessageEmbed {
        const _embed = new MessageEmbed()
        _embed.addField(`Minecraft`, this.toString() + `\n\nStanding on: ${this.character.underBlock}\n x: ${this.character.x}\ny: ${this.character.y}` , false)
        return _embed
    }

    async startLoop(): Promise<void> {
        await this.send()
        this.client.on('message', async (message: Message) => this.messageProcedure(message))
    }

    async messageProcedure(message: Message): Promise<void> {
        if (!this.active) return
        if (message.content == 'w' || message.content == 'a' || message.content == 's' || message.content == 'd') this.handleInput(message.content, message)
    }
    
    private contentToFunction: object = {
        w: () => {
            this.moveCharacter(0, -1)
        },
        a: () => {
            this.moveCharacter(-1, 0)
        },
        s: () => {
            this.moveCharacter(0, 1)
        },
        d: () => {
            this.moveCharacter(1, 0)
        }
    }


    handleInput(content: string, message: Message): void {
        this.contentToFunction[content]()
        if (this.channel.type == 'text') {
            //if (!message.deleted) message.delete()
        }
    }

    moveCharacter(x: number, y: number): void {

        // the character cannot cross the boundries of the map
        if (this.character.x == 0 && x == -1) {
            this.update()
            return
        }
        if (this.character.x == this.LENGTH - 1 && x == 1) {
            this.update()
            return
        }
        if (this.character.y == 0 && y == -1) {
            this.update()
            return
        }
        if (this.character.y == this.WIDTH - 1 && y == 1) {
            this.update()
            return
        }

        this.grid[this.character.y][this.character.x] = this.character.underBlock
        this.character.x += x
        this.character.y += y

        // checking for boundries and fixing them (old)
        /*
        if (this.character.x == -1) this.character.x = this.LENGTH - 1
        if (this.character.y == -1) this.character.y = this.WIDTH - 1
        if (this.character.x == this.LENGTH) this.character.x = 0
        if (this.character.y == this.WIDTH) this.character.y = 0
        */


        this.character.underBlock = this.grid[this.character.y][this.character.x]
        this.grid[this.character.y][this.character.x] = this.character.str()

        this.update()
       
    }

    update() {
        this.channel.send(this.makeEmbed())
    }
}