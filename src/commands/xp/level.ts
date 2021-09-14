import type { Command, XP } from '$types';
import type { User, ColorResolvable } from 'discord.js';

const command: Command.Init = {
  alias: ['lvl', 'xp'],
  description: 'Get leveling details!',
  usage: '```{prefix}level <@User | :author>```',
  async execute({ args, msg, realm, client }) {
    let user: User;
    if (!args!.length) user = msg!.author;
    else user = msg!.mentions.users.first() || msg!.author;
    const member = await msg!.guild!.members.fetch(user),
      search = realm!
        .objects<XP.Init>('xp')
        .filtered(`guildId == "${msg!.guild!.id}" && id == "${member.id}"`);
    if (search.length) {
      const target = search[0];
      await msg!.channel.send({
        embeds: [
          {
            color: client!.servers!.get(msg!.guild!.id)!.color as ColorResolvable,
            author: {
              name: `${member.user.tag}${member.nickname ? ` | ${member.nickname}` : ''}`,
              icon_url: member.user.displayAvatarURL()
            },
            title: `${client!.emojis.cache.get('887266849958539264')} Leveling Info`,
            thumbnail: {
              url: member.user.displayAvatarURL({ format: 'png', size: 1024 })
            },
            fields: [
              {
                name: 'Level',
                value: target.level.toString()
              },
              {
                name: 'Current XP',
                value: target.xp.toString()
              },
              {
                name: 'Required XP',
                value: target.requiredXp.toString()
              },
              {
                name: 'Total XP',
                value: target.totalXp.toString()
              }
            ],
            footer: {
              text: `Requested by ${msg!.author.tag}`,
              icon_url: msg!.author.displayAvatarURL()
            }
          }
        ]
      });
      return;
    }
  }
};

export default command;
