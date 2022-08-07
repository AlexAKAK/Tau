import { Message, Embed, MessageReaction, ReactionCollector, User } from "discord.js";
import src from "../../..";
import CommandClass from "../../classes/CommandClass.js";
import defaultColor from "../../utility/embeds/defaultColor.js";


export default class shop extends CommandClass {
    public async commandMain(message: Message<boolean>, client: src): Promise<void> {
        const items: object[] = require('./../../../../data/items');
        const embed: Embed = new Embed()
            .setTitle('Shop')
            .setDescription('React to messages to purchase items')
            .setColor(defaultColor)

        for (const item of items) {
            embed.addField(item['name'], `${item['price']} coins`)
        }

        const sentMessage: Message = await message.channel.send({ embeds: [embed] });

        for (const item of items) {
            await sentMessage.react(item['emoji'])
        }

        const collector: ReactionCollector = sentMessage.createReactionCollector({ time: 10000 });

        collector.on('collect', async (reaction: MessageReaction, user: User) => {
            if (user.id == client.user.id) return

            const reactionEmoji: string = reaction.emoji.toString()
            const item: object = items.find(i => i['emoji'] == reactionEmoji)

            if (item == undefined || item == null) return
            const economy: object = require('./../../../../data/economy')

            economy[user.id]

        })

    }
    
}