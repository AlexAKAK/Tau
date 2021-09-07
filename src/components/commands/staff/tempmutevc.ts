import { DMChannel, GuildMember, Message, TextChannel } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from "../../classes/CommandClass";
import defaultColor from "../../utility/embeds/defaultColor";


@tempmutevc.errorCheck([
    tempmutevc.MISSING_ARGS_ERR_4
])



const MUTED_ROLE: string = '884635864557293611'

export default class tempmutevc extends CommandClass {
    protected static commandDescription: string = 'A user is temporarily muted from vc'
    protected static commandSyntax: string = 'tempmutevc <userping> <duration> <unit (s/m/h)>'
    static MISSING_ARGS_ERR_4 = tempmutevc.MISSING_ARGS_ERR_METACLASS(4)
    async commandMain(message: Message, client: HydroCarbon) {
        console.log('tempmutevc')
        const args = tempmutevc.splitArgs(message)

        const playerId = args[1].substring(3).replace('>', '')
        console.log(playerId)
        const duration = Number(args[2])
        if (duration == NaN) return

        const unitSymbol = args[3]
        let unit: string
        const realDuration: number = tempmutevc.convertTo(duration, unitSymbol)
        if (unitSymbol == 'm') unit = 'minutes'
        else if (unitSymbol == 'h') unit = 'hours'
        else unit = 'seconds'
        const victim: GuildMember = tempmutevc.getMember(playerId, message.guild)
        if (victim == undefined) return
        if (victim == message.guild.me) return

        victim.roles.add(MUTED_ROLE)

        setTimeout(() => {
            victim.roles.remove(MUTED_ROLE)
        }, realDuration * 1000)

        tempmutevc.sendEmbed(<TextChannel> message.channel, {
            title: `Temporarily vc muted ${victim.user.tag} for ${duration} ${unit}`,
            color: defaultColor,
            deleteTimeout: 5000,
        })

        victim.user.createDM()
        .then(dmChannel => tempmutevc.sendEmbed(<DMChannel> dmChannel, {
            title: `You have been vc muted for ${duration} ${unit} in ${victim.guild.name}.`,
            color: defaultColor
        }))
    }

    static convertTo(ms: number, unit: string): number {
        if (unit == 'm') return ms * 60
        else if (unit == 'h') return ms * 60 * 60
        else return ms
    }

}