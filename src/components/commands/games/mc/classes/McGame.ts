/*
Add inventory
*/

import { DMChannel, Message, MessageEmbed, TextChannel, Client } from "discord.js"
import Tau from "../../../../.."
import emojis from "../../../../utility/emojis"
import GameSuperClass from "../../../../classes/GameSuperClass"
import getRandomInt from "../../../../utility/getRandomInt"

import characterInterface from "../interfaces/characterInterface"
import grass from "./items/grass"
import stone from "./items/stone"
import tree from "./items/tree"
import Item from "../interfaces/Item"
import blockTypes from "../enums/blockTypes"
import { clearScreenDown } from "readline"
import direction from "../enums/direction"
import CommandClass from "../../../../classes/CommandClass"
import woodenPickaxe from "./items/woodenPickaxe"
import miningDifficultyEnum from "../enums/miningDifficultyEnum"
import cactus from "./items/cactus"
import stoneSword from "./items/stoneSword"

const sendEmbed = require("./../../../../utility/embeds/sendEmbed")



const characterEmoji = emojis.character
const heart = emojis.heart

type block = string

export default class McGame extends GameSuperClass {
    public gameName: string = 'Minecraft'
    private client: Tau
    private channel: TextChannel|DMChannel
    private messageInChannel: Message = null
    public mostRecentMessage: Message = null
    WIDTH: number = 13
    LENGTH: number = 13

    grid = []

    

    public character: characterInterface = {
        x: 4,
        y: 4,
        str: function() {
            const dirToCharacterEmoji: object = {
                0: emojis.upArrow,
                1: emojis.downArrow,
                2: emojis.leftArrow,
                3: emojis.rightArrow
            }
            console.log(dirToCharacterEmoji[this.direction])
            return dirToCharacterEmoji[this.direction]
        },
        underBlock: null,
        health: 10,
        getHearts: function() {
            let s = ''
            for (let i = 0; i < this.health; i++) {
                s += heart
            }
            return s
        },
        /**
         * @returns Item
         */
        incrementHealth: function(): void {
            this.health += 2       },
        incrementHunger: function(): void {
            this.hunger += 2
        },
        getNorthBlock: () => {
            if (this.character.y == 0) return null
            return this.grid[this.character.y - 1][this.character.x]
        },
        /**
         * @returns Item
         */
        getSouthBlock: () => {
            if (this.character.y == this.WIDTH - 1) return null
            return this.grid[this.character.y + 1][this.character.x]
        },
        /**
         * @returns Item
         */
        getWestBlock: () => {
            if (this.character.x == 0) return null
            return this.grid[this.character.y][this.character.x - 1]
        },
        /**
         * @returns Item
         */
        getEastBlock: () => {
            if (this.character.x == this.LENGTH - 1) return null
            return this.grid[this.character.y][this.character.x + 1]
        },
        mine: (block: Item) => {
            block.mine(this)
        },
        getBlockInFront: () => {
            if(this.character.direction == direction.FACE_UP) return this.character.getNorthBlock()
            if(this.character.direction == direction.FACE_DOWN) return this.character.getSouthBlock()
            if(this.character.direction == direction.FACE_LEFT) return this.character.getWestBlock()
            if(this.character.direction == direction.FACE_RIGHT) return this.character.getEastBlock()
            
        },
        direction: direction.FACE_DOWN,
        inventory: [],
        use: (slot: number) => {
            this.character.inventory[slot].use(this) // pass the gameInstance as the argument
        },
        craft: (item: string) => {
            if (item == 'wooden_pickaxe') woodenPickaxe.craft(this)
            if (item == 'stone_sword') stoneSword.craft(this)

        },
        hunger: 10,
        getHungerBar: function(): string {
            let s = '';
            for (let i = 0; i < this.hunger; i++) {
                s = `${s}${emojis.chickenDrumstick}`
            }
            if (s == '') return "Dead"
            else return s
        },
        isAlive: function(): boolean {
            if (this.health == 0) return false
            if (this.hunger == 0) return false
            return true
        }
    }

    constructor(_client: Tau, _channel: TextChannel) {
        super()
        this.renderTerrain()
        this.renderCharacterInit()
        this.client = _client
        this.channel = _channel
        this.startLoop()
    }

    private renderTerrain(): void {
        // fill with grass
        for (let i = 0; i < this.WIDTH; i++) {
            this.grid.push([])
            for (let j = 0; j < this.LENGTH; j++) {
                
                this.grid[i].push(this.generateBlock().setChoords(j, i))
            }
        }
        // add a few gray ones (stone)
        // add a couple trees
    }

    private generateBlock(): Item {
        const i = getRandomInt(10)
        if (i == 1) return new tree()
        else if (i == 2 || i == 3) return new stone()
        else if (i == 4) return new cactus()
        else return new grass()
    }

    private renderCharacterInit(): void {
        this.character.underBlock = this.grid[this.character.y][this.character.x]
        this.grid[this.character.y][this.character.x] = this.character.str()
    }

    private updateCharacter(): void {
        // randomly deduct a hunger point
        const i = getRandomInt(3)
        if (i == 3) this.character.hunger--
        this.grid[this.character.y][this.character.x] = this.character.str()
    }


    makeEmbed(): MessageEmbed {
        const _embed = new MessageEmbed()
        _embed.addField(`Minecraft`, this.toString() , false)
        _embed.addField('Standing on', this.character.underBlock, false)
        _embed.addField('x', this.character.x, false)
        _embed.addField('y', this.character.y, false)
        _embed.addField('Health', this.character.getHearts(), false)
        _embed.addField('Hunger', this.character.getHungerBar(), false)
        _embed.addField('Facing', this.directionToString[this.character.direction], false)
        _embed.addField('Inventory', this.inventoryToString(), false)
        return _embed
    }

    async startLoop(): Promise<void> {
        this.messageInChannel = await this.channel.send(this.makeEmbed())
        this.client.on('message', async (message: Message) => this.messageProcedure(message))
    }

    async messageProcedure(message: Message): Promise<void> {
        if (!this.active) return
        this.mostRecentMessage = message
        if (this.contentToFunction[message.content.split(' ')[0]] != undefined) this.handleInput(message.content.split(' ')[0], message)
    }

    private directionToString: object = {
        0: 'north',
        1: 'south',
        2: 'west',
        3: 'east'
    }
    
    private contentToFunction: object = {
        w: (message: Message) => {
            this.character.direction = direction.FACE_UP
            this.moveCharacter(0, -1)
            
        },
        a: (message: Message) => {
            this.character.direction = direction.FACE_LEFT
            this.moveCharacter(-1, 0)
            
        },
        s: (message: Message) => {
            this.character.direction = direction.FACE_DOWN
            this.moveCharacter(0, 1)
            
        },
        d: (message: Message) => {
            this.character.direction = direction.FACE_RIGHT
            this.moveCharacter(1, 0)
            
        },
        mine: (message: Message) => {
            const block: Item = this.character.getBlockInFront()
            if (block.miningDifficulty == miningDifficultyEnum.STANDARD) this.character.mine(block)
        },
        rotate180: (message: Message) => {
            const conversion: object = {
                0: 1,
                1: 0,
                2: 3,
                3: 2
            }
            
            const currentDirection = this.character.direction
            this.character.direction = conversion[currentDirection]

            this.grid[this.character.y][this.character.x] = this.character.str()

        },
        rotate90: (message: Message) => {
            const conversion: object = {
                0: 3,
                1: 2,
                2: 0,
                3: 1
            }
            
            const currentDirection = this.character.direction
            this.character.direction = conversion[currentDirection]
            this.grid[this.character.y][this.character.x] = this.character.str()

        },
        rotate270: (message: Message) => {
            const conversion: object = {
                0: 2,
                1: 3,
                2: 1,
                3: 0
            }
            
            const currentDirection = this.character.direction
            this.character.direction = conversion[currentDirection]
            this.grid[this.character.y][this.character.x] = this.character.str()

        },
        use: (message: Message) => {
            const args = message.content.split(' ')
            // if not enough args
            if (args.length < 2) return
            const slot: number = Number(args[1])
            // if the slot number is too high
            if (slot > this.character.inventory.length - 1) return
            this.character.use(slot)
        },
        craft: (message: Message) => {
            const CRAFTABLE_ITEM_NAMES: string[] = ['wooden_pickaxe', 'stone_sword']
            const args = message.content.split(' ')
            // if not enough args
            if (args.length < 2) return
            const item: string = args[1]
            if (CRAFTABLE_ITEM_NAMES.includes(item)) this.character.craft(item)
            

        }
    }


    handleInput(content: string, message: Message): void {
        this.contentToFunction[content](message)
        if (this.channel.type == 'text') {
            //if (!message.deleted) message.delete()
        }
        this.update()
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

       
    }
    private characterDeathProcedure(): void {
        this.active = false
        sendEmbed(this.messageInChannel.channel, {
            title: `You have died. Good Game!`,
            color: 'GREEN'
        })
    }

    update(): void {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                const block: any = this.grid[j][i]
                if (typeof(block) != 'string') block.update(this)
            }
        }
        if (getRandomInt(3) == 1) this.character.hunger -= 1;    
        // if the character is dead, activate the deathProdcedure
        if (!this.character.isAlive()) {this.characterDeathProcedure(); return;}
        this.updateCharacter()
        this.channel.send(this.makeEmbed())
    }

    checkIfCanMove(x: number, y: number): boolean {
        // trying to move outside of the map
        if (this.character.x == 0 && x == -1) return false
        if (this.character.x == this.LENGTH - 1 && x == 1) return false
        if (this.character.y == 0 && y == -1) return false
        if (this.character.y == this.WIDTH - 1 && y == 1) return false

        if (this.grid[this.character.y + y][this.character.x + x].blockType == blockTypes.NOT_WALK_OVER) return false
        return true
    }

    private inventoryToString(): string {
        let s: string = ''
        for (let i = 0; i < this.character.inventory.length; i++) {
            s = `${s} ${i}. ${this.character.inventory[i].toString()}`
        }
        if (s == '') return 'Empty'
        else return s
    }

}