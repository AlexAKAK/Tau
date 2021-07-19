import discordButtons from "discord-buttons"
import { DMChannel, Message, MessageEmbed, TextChannel, Client } from "discord.js"
import HydroCarbon from "../.."
import emojis from "../utility/emojis"
import GameSuperClass from "./GameSuperClass"


const blackSquare = emojis.blackSquare
const character = emojis.character

interface coordinatePair {
    x: number,
    y: number
}

const c = new Client()
export default class McGame extends GameSuperClass{
    public gameName: string = 'Minecraft'
    private client: HydroCarbon
    private channel: TextChannel|DMChannel
    private messageInChannel: Message
    private WIDTH: number = 7
    private LENGTH: number = 7

    private coordinates: string[][] = [
        [blackSquare, blackSquare ,blackSquare, blackSquare, blackSquare, blackSquare, blackSquare],
        [blackSquare, blackSquare ,blackSquare, blackSquare, blackSquare, blackSquare, blackSquare],
        [blackSquare, blackSquare ,blackSquare, blackSquare, blackSquare, blackSquare, blackSquare],
        [blackSquare, blackSquare ,blackSquare, blackSquare, blackSquare, blackSquare, blackSquare],
        [blackSquare, blackSquare ,blackSquare, blackSquare, blackSquare, blackSquare, blackSquare],
        [blackSquare, blackSquare ,blackSquare, blackSquare, blackSquare, blackSquare, blackSquare],
        [blackSquare, blackSquare ,blackSquare, blackSquare, blackSquare, blackSquare, blackSquare]
    ]

    private characterCoords: coordinatePair = {
        x: 4,
        y: 4
    }

    constructor(_client: HydroCarbon, _channel: TextChannel) {
        super()
        this.coordinates[this.characterCoords.y][this.characterCoords.x] = character
        this.client = _client
        this.channel = _channel
        this.startLoop()
    }

    async send(): Promise<void> {
        const _embed = new MessageEmbed()
        _embed.addField('Minecraft', this.coordinates, false)
        this.messageInChannel = await this.channel.send(_embed)
    }

    makeEmbed(): MessageEmbed {
        const _embed = new MessageEmbed()
        _embed.addField('Minecraft', this.coordinates, false)
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
            if (!message.deleted) message.delete()
        }
    }

    moveCharacter(x: number, y: number): void {
        this.coordinates[this.characterCoords.y][this.characterCoords.x] = blackSquare
        this.characterCoords.x += x
        this.characterCoords.y += y

        // checking for boundries and fixing them
        if (this.characterCoords.x == -1) this.characterCoords.x = this.LENGTH - 1
        if (this.characterCoords.y == -1) this.characterCoords.y = this.WIDTH - 1
        if (this.characterCoords.x == this.LENGTH) this.characterCoords.x = 0
        if (this.characterCoords.y == this.WIDTH) this.characterCoords.y = 0


        this.coordinates[this.characterCoords.y][this.characterCoords.x] = character

        this.update()
       
    }

    update() {
this.channel.send(this.makeEmbed())
    }
}