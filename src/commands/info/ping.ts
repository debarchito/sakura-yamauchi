import type { Command } from '$types';
import type { ColorResolvable } from 'discord.js';

const command: Command.Init = {
  description: 'Gets the latency!',
  usage: '```{prefix}ping```',
  async execute({ msg, client }) {
    await msg!.channel.send({
      embeds: [
        {
          color: client!.servers!.get(msg!.guild!.id)!.color as ColorResolvable,
          author: {
            name: msg!.author.username,
            icon_url: msg!.author.displayAvatarURL()
          },
          title: 'And thats a pong! :womans_hat:',
          fields: [
            {
              name: 'Latency',
              value: `${Date.now() - msg!.createdTimestamp}ms`,
              inline: true
            },
            {
              name: 'API Latency',
              value: `${Math.round(client!.ws.ping)}ms`,
              inline: true
            }
          ],
          footer: {
            text: `${client!.user!.username} (c) Debarchito`,
            icon_url: client!.user!.displayAvatarURL()
          }
        }
      ]
    });
  }
};

export default command;
