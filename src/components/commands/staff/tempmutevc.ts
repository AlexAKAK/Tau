import { DMChannel, GuildMember, Message, TextChannel } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from "../../classes/CommandClass";
import defaultColor from "../../utility/embeds/defaultColor";


@tempmutevc.errorCheck([
    tempmutevc.MISSING_ARGS_ERR_3
])


export default class tempmutevc extends CommandClass {
    protected static commandDescription: string = 'A user is temporarily muted from vc'
    protected static commandSyntax: string = 'tempmutevc <userping> <duration in ms>'
    static MISSING_ARGS_ERR_3 = tempmutevc.MISSING_ARGS_ERR_METACLASS(3)
    async commandMain(message: Message, client: HydroCarbon) {
        console.log('tempmutevc')
        const args = tempmutevc.splitArgs(message)

        const playerId = args[1].substring(3).replace('>', '')
        console.log(playerId)
        const duration = Number(args[2])*1000
        const victim: GuildMember = tempmutevc.getMember(playerId, message.guild)
        if (victim == message.guild.me) return

        victim.voice.setMute(true)

        setTimeout(() => {
            victim.voice.setMute(false)
        }, duration)

        tempmutevc.sendEmbed(<TextChannel> message.channel, {
            title: `Temporarily vc muted ${victim.user.tag} for ${duration/1000} seconds.`,
            color: defaultColor,
            deleteTimeout: 5000,
        })

        victim.user.createDM()
        .then(dmChannel => tempmutevc.sendEmbed(<DMChannel> dmChannel, {
            title: `You have been vc muted for ${duration/1000} seconds in ${victim.guild.name}.`,
            color: defaultColor
        }))
    }

}