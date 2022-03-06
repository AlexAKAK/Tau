import { GuildMember, Message } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass";
import defaultColor from "../../utility/embeds/defaultColor";
//import readJson from "../../utility/readJson";

const sendEmbed = require('./../../utility/embeds/sendEmbed')

const fs = require('fs')
//import readJson from "../../utility/readJson";



export default class bal extends CommandClass {

    protected static commandCategory: string = 'economy'
    protected static commandDescription: string = 'shows your currency balance'
    protected static commandSyntax: string = 'bal <?user>'

    async commandMain(message: Message, client: Tau) {
        const wallets: object = require('./../../../../data/wallets.json')
        console.log(wallets)
        const args = message.content.split(' ')
        args.shift()
        if (wallets[message.author.id] == undefined) sendEmbed(message.channel, {
            title: `${message.author.tag}, you do not have a wallet! You can make one using the walletcreate command.`,
            color: defaultColor,
            deleteTimeout: 5000
        })

        
        else if (args.length == 0) sendEmbed(message.channel, {
            title: `${message.author.tag}'s balance is ${wallets[message.author.id]} TauCoin.`,
            color: defaultColor,
            deleteTimeout: 5000
        })

        else if (args.length == 1) {
            const playerId = args[0].substring(3).replace('>', '')
            const member: GuildMember = bal.getMember(playerId, message.guild)

            const balance: Number|undefined = wallets[member.user.id]

            if (balance == undefined) sendEmbed(message.channel, {
                title: `${member.user.tag} does not have a wallet.`,
                color: defaultColor,
                deleteTimeout: 5000
            })
            else sendEmbed(message.channel, {
                title: `${member.user.tag}'s balance is ${wallets[member.user.id]} TauCoin.`,
                color: defaultColor,
                deleteTimeout: 5000
            })
        }
    }
}