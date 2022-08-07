import Tau from "../..";

const { SlashCommandBuilder, Routes, REST } = require('discord.js');

//import { REST } from '@discordjs/rest';


export default function registerSlashCommands(client: Tau, token: string, guildID: string) {

    const data = new SlashCommandBuilder() // the commands
    .setName('info')
    .setDescription('Get info about a user or a server!')


    const rest = new REST({ version: '10' }).setToken(token);

    
    const commands: any[] = [
        data // the command
    ]


    rest.put(Routes.applicationGuildCommands(client.user.id, guildID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
}