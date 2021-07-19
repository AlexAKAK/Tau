/*
Add inventory
*/



import discordButtons from "discord-buttons"
import { DMChannel, Message, MessageEmbed, TextChannel, Client } from "discord.js"
import HydroCarbon from "../../../../.."
import emojis from "../../../../utility/emojis"
import GameSuperClass from "../../../../classes/GameSuperClass"
import getRandomInt from "../../../../utility/getRandomInt"

import characterInterface from "../interfaces/characterInterface"
import grass from "./items/grass"
import stone from "./items/stone"
import tree from "./items/tree"
import Item from "../interfaces/Item"
import blockTypes from "./blockTypes"
import { clearScreenDown } from "readline"



const characterEmoji = emojis.character
const heart = emojis.heart

type block = string

export default class McGame extends GameSuperClass{
    public gameName: string = 'Minecraft'
    private client: HydroCarbon
    private channel: TextChannel|DMChannel
    private messageInChannel: Message
    WIDTH: number = 9
    LENGTH: number = 9

    grid = []

    private character: characterInterface = {
        x: 4,
        y: 4,
        str: function() {
            return characterEmoji
        },
        underBlock: null,
        health: 10,
        getHearts: function() {
            let s = ''
            for (let i = 0; i < this.health; i++) {
                s += heart
            }
            return s
        }
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

    private generateBlock(): Item {
        const i = getRandomInt(10)
        if (i == 1) return new tree()
        else if (i == 2 || i == 3) return new stone()
        else return new grass()
    }

    private renderCharacter(): void {
        this.character.underBlock = this.grid[this.character.y][this.character.x]
        this.grid[this.character.y][this.character.x] = this.character.str()
    }


    makeEmbed(): MessageEmbed {
        const _embed = new MessageEmbed()
        _embed.addField(`Minecraft`, this.toString() , false)
        _embed.addField('Standing on', this.character.underBlock, false)
        _embed.addField('x', this.character.x, false)
        _embed.addField('y', this.character.y, false)
        _embed.addField('Health', this.character.getHearts(), false)

        return _embed
    }

    async startLoop(): Promise<void> {
        this.messageInChannel = await this.channel.send(this.makeEmbed())
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
        if (!this.checkIfCanMove(x, y)) {
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

    update(): void {
        this.channel.send(this.makeEmbed())
    }

    checkIfCanMove(x: number, y: number): boolean {
        console.log(`x: ${x} y: ${y}`)
        if (this.character.x == 0 && x == -1) return false
        if (this.character.x == this.LENGTH - 1 && x == 1) return false
        if (this.character.y == 0 && y == -1) return false
        if (this.character.y == this.WIDTH - 1 && y == 1) return false

        if (this.grid[this.character.y + y][this.character.x + x].blockType == blockTypes.NOT_WALK_OVER) return false
        return true
    }


}