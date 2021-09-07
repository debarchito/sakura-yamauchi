import type { __commands } from "$types";
import type { ColorResolvable } from 'discord.js';

const command: __commands = {
    name: 'ping',
    description: 'Gets the latency!',
    usage: `\`\`\`{prefix}ping\`\`\``,
    async execute({ msg, servers, client }) {
        await msg!.channel.send({
            embeds: [{
                color: servers!.get(msg!.guild!.id)!.color as ColorResolvable,
                author: {
                    name: msg!.author.username,
                    icon_url: msg!.author.displayAvatarURL()
                },
                title: 'And thats a pong! :womans_hat:',
                fields: [
                   { name: 'Latency', value: `${Date.now() - msg!.createdTimestamp}ms`, inline: true },
                   { name: 'API Latency', value: `${Math.round(client!.ws.ping)}ms`, inline: true }
                ],
                footer: {
                    text: `Sakura Yamauchi (c) Debarchito`,
                }
            }]
        });
    }
}

export default command;