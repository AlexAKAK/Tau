import { GuildMember } from "discord.js";
import { Message } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass"
import defaultColor from "../../utility/embeds/defaultColor";
import getRandomInt from "../../utility/getRandomInt";
const sendEmbed = require('./../../utility/embeds/sendEmbed')
const fs = require('fs')


@mine.memberCooldown(60000)
export default class mine extends CommandClass {

    protected static commandCategory: string = 'currency'
    protected static commandDescription: string = 'you mine an amount of currency'
    protected static commandSyntax: string = 'mine'

    public static mostRecentMine: object = []


    async commandMain(message: Message, client: Tau) {


        // check if the message author is allowed to mine
        /*if (!mine.checkIfMiningIsAllowed(message.author.id)) {
            sendEmbed(message.channel, {
                title: `${message.author.tag}, you are on mining cooldown.`,
                color: 'RED',
                deleteTimeout: 5000
            })
            return;
        }
        */

        const wallets: object = require('./../../../../data/wallets.json')
        if (wallets[message.author.id] == undefined) sendEmbed(message.channel, {
            title: `${message.author.tag}, you do not have a wallet! You can make one using the walletcreate command.`,
            color: 'GREEN',
            deleteTimeout: 5000
        })
        else {
            const amount: number = getRandomInt(1000)
            wallets[message.author.id] += amount
            const logPath = require('path').resolve(__dirname, './../../../../data/wallets.json')
            const jsonString: string = JSON.stringify(wallets)
            fs.writeFile(logPath, jsonString, err => {
                if (err) {
                  console.error(err)
                  return
                }
                //file written successfully
            })

            sendEmbed(message.channel, {
                title: `${message.author.tag} mined ${amount} TauCoin`,
                color: defaultColor,
                deleteTimeout: 5000
            })

            mine.mostRecentMine[message.author.id] = Date.now()

        
        }
    }

    public static checkIfMiningIsAllowed(messageAuthorId: string): boolean {
        const lastMineTime: number|undefined = mine.mostRecentMine[messageAuthorId] // could be undefined

        if (lastMineTime == undefined) return true
        const difference = Date.now() - lastMineTime

        if (difference >= 60000) return true
        else return false
    }
}