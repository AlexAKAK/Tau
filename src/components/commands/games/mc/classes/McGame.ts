/*
Add inventory
*/

import { DMChannel, Message, Embed, TextChannel, Client, EmbedBuilder } from "discord.js"
import Tau from "../../../../.."
import emojis from "../../../../utility/emojis.js"
import GameSuperClass from "../../../../classes/GameSuperClass.js"
import getRandomInt from "../../../../utility/getRandomInt.js"

import characterClass from "./characterClass.js"
import grass from "./items/grass.js"
import stone from "./items/stone.js"
import tree from "./items/tree.js"
import Item from "../interfaces/Item.js"
import blockTypes from "../enums/blockTypes.js"
import { clearScreenDown } from "readline"
import direction from "../enums/direction.js"
import CommandClass from "../../../../classes/CommandClass.js"
import woodenPickaxe from "./items/woodenPickaxe.js"
import miningDifficultyEnum from "../enums/miningDifficultyEnum.js"
import cactus from "./items/cactus.js"
import stoneSword from "./items/stoneSword.js"

import sendEmbed from "./../../../../utility/embeds/sendEmbed.js"



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

    

    public character: characterClass

    constructor(_client: Tau, _channel: TextChannel) {
        super()
        this.character = new characterClass(this) // pass the gameInstance into the characterClass constructor
        
        

        console.log(this.character)

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


    makeEmbed(): EmbedBuilder {

        console.log(this.toString())
        console.log(this.character.underBlock)
        console.log(this.character.x)
        console.log(this.character.y)





        const _embed = new EmbedBuilder()
        /*
        _embed.addField(`Minecraft`, this.toString() , false)
        
        _embed.addField('Standing on', String(this.character.underBlock), false)
        _embed.addField('x', String(this.character.x), false)
        _embed.addField('y', String(this.character.y), false)
        _embed.addField('Health', String(this.character.getHearts()), false)
        _embed.addField('Hunger', String(this.character.getHungerBar()), false)
        _embed.addField('Facing', String(this.directionToString[this.character.direction]), false)
        _embed.addField('Inventory', String(this.inventoryToString()), false)
        */

        _embed.addFields({
            name: `Minecraft`,
            value: this.toString(),
            inline: false
        },
        {
            name: 'Standing on',
            value: String(this.character.underBlock),
            inline: false
        },
        {
            name: 'x',
            value: String(this.character.x),
            inline: false
        },
        {
            name: 'y',
            value: String(this.character.y),
            inline: false
        },
        {
            name: 'Health',
            value: String(this.character.getHearts()),
            inline: false
        },
        {
            name: 'Hunger',
            value: String(this.character.getHungerBar()),
            inline: false
        },
        {
            name: 'Facing',
            value: String(this.directionToString[this.character.direction]),
            inline: false
        },
        {
            name: 'Inventory',
            value: String(this.inventoryToString()),
            inline: false
        }
        )

        return _embed
    }

    async startLoop(): Promise<void> {
        this.messageInChannel = await this.channel.send({embeds: [this.makeEmbed()]})
        this.client.on('messageCreate', async (message: Message) => this.messageProcedure(message))
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
        sendEmbed(<TextChannel> this.messageInChannel.channel, {
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
        this.channel.send({embeds: [this.makeEmbed()]})
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