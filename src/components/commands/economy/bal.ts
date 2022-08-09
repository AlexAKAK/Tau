import { ChatInputCommandInteraction, GuildMember, Message, SlashCommandBuilder } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass.js";
import defaultColor from "../../utility/embeds/defaultColor.js";
//import readJson from "../../utility/readJson";

import sendEmbed from './../../utility/embeds/sendEmbed.js';

import fs from 'fs';
//import readJson from "../../utility/readJson";



export default class bal extends CommandClass {

    protected static commandCategory: string = 'economy'
    protected static commandDescription: string = 'shows your currency balance'
    protected static commandSyntax: string = 'bal <?user>'




    public static slashCommand = new SlashCommandBuilder()
        .setName('bal')
        .setDescription('displays user balance')
        .addUserOption(user => {
            user.setName('user')
            .setDescription('The user to check the balance for')
            .setRequired(false)
            return user
        })





    async commandMain(interaction: ChatInputCommandInteraction, client: Tau) {
        const wallets: object = require('./../../../../data/wallets.json')

        
        console.log(wallets)
        //const args = message.content.split(' ')
        //args.shift() // remove the command call



        const user = interaction.options.getUser('user')

        console.log(user)

        // for caller
        if (wallets[message.author.id] == undefined) sendEmbed(message.channel, {
            title: `${message.author.tag}, you do not have a wallet! You can make one using the walletcreate command.`,
            color: defaultColor,
            deleteTimeout: 5000
        })

        // for caller
        else if (args.length == 0) sendEmbed(message.channel, {
            title: `${message.author.tag}'s balance is ${wallets[message.author.id]} TauCoin.`,
            color: defaultColor,
            deleteTimeout: 5000
        })

        else if (args.length == 1) {
            const playerId = args[0].substring(3).replace('>', '')
            console.log(playerId)
            const member: GuildMember = bal.getMember(playerId, message.guild)

            

            if (member == undefined || member == null) {
                sendEmbed(message.channel, {
                    title: `${member.user.tag} does not have a wallet.`,
                    color: defaultColor,
                    deleteTimeout: 5000
                })
                
                return

            }


            const balance: Number|undefined = wallets[member.user.id]


            sendEmbed(message.channel, {
                title: `${member.user.tag}'s balance is ${wallets[member.user.id]} TauCoin.`,
                color: defaultColor,
                deleteTimeout: 5000
            })
        }
    }
}