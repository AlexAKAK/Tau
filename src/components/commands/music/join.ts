import { Message } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from '../../classes/CommandClass'
const {randomHi, randomBye} = require('./.././../utility/gifs')


@join.alias(['j'])

@join.errorCheck([
    join.MEMBER_NOT_IN_VC_ERR, 
    join.CLIENT_ALREADY_IN_VC_ERR
])

export default class join extends CommandClass {

    async commandMain(message: Message, client: HydroCarbon) {
        message.member.voice.channel.join()
    }   
}

