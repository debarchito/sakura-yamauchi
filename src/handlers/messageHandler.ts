import { MessageEmbedOptions, ColorResolvable, PermissionResolvable } from 'discord.js';
import share from './share/index.js';

import type { Sakura, Command } from '$types';
import type { Message } from 'discord.js';
import type Realm from 'realm';

export default async function messageHandler({
  msg,
  client,
  cmd,
  args,
  realm
}: {
  msg: Message;
  client: Sakura.Client;
  cmd: string;
  args: string[];
  realm: Realm;
}): Promise<void> {
  if (cmd === 'help') {
    if (!args.length) {
      const help: MessageEmbedOptions = {
        author: {
          name: `${client.user!.username} | Help Utility`,
          icon_url: client.user!.displayAvatarURL()
        },
        description: `I say, "Right now, I, as formed as such, am living in this moment, I am living through our choices, right now, right here, you, and me as well, are living."`,
        color: client.servers!.get(msg.guild!.id)!.color as ColorResolvable,
        fields: [],
        thumbnail: {
          url: client.user!.displayAvatarURL()
        },
        footer: {
          text: `To view the documentation of a command, type ${client.servers!.get(msg.guild!.id)!.prefix}help <command | alias>`
        }
      };
      for (const [cat, cmd] of client.categories!) {
        help.fields!.push({
          name: cat,
          value: cmd
        });
      }
      await msg.channel.send({
        embeds: [help],
        allowedMentions: {
          repliedUser: false
        }
      });
      return;
    }
    const command: Command.Init | undefined =
      client.commands!.get(args[0]) ||
      client.commands!.find((cm: Command.Init) => !!cm.alias && cm.alias.includes(args[0]));
    if (!command) {
      await msg.reply({
        content: `The command "${args[0]}" doesn't exist.`,
        allowedMentions: {
          repliedUser: false
        }
      });
      return;
    }
    const fields: {
      name: string;
      value: string;
    }[] = [];
    if (command.alias)
      fields.push({
        name: 'Aliases',
        value: command.alias.map(item => `\`${item}\``).join(', ')
      });
    fields.push(
      {
        name: 'Description',
        value: command.description
      },
      {
        name: 'Usage',
        value: command.usage.replace(/\{(prefix|color)\}/gm, (_: string, a: string): string => {
          if (a === 'prefix') return client.servers!.get(msg.guild!.id)!.prefix;
          else if (a === 'color') return client.servers!.get(msg.guild!.id)!.color.toString();
          else return '';
        })
      }
    );
    await msg.channel.send({
      embeds: [
        {
          author: {
            name: `${client!.user!.username} | Help Utility`,
            icon_url: client!.user!.displayAvatarURL()
          },
          title: `Documentation for "${command.name}"`,
          color: client!.servers!.get(msg!.guild!.id)!.color as ColorResolvable,
          fields: fields,
          thumbnail: {
            url: client!.user!.displayAvatarURL()
          },
          footer: {
            text: `Requested by ${msg!.author.tag}`,
            icon_url: msg!.author.displayAvatarURL()
          }
        }
      ],
      allowedMentions: {
        repliedUser: false
      }
    });
    return;
  }
  const command: Command.Init | undefined =
    client.commands!.get(cmd) ||
    client.commands!.find((cm: Command.Init) => !!cm.alias && cm.alias.includes(cmd!));
  if (!command) return;
  if (process.env.MAINTENANCE !== 'off') {
    if (!JSON.parse(process.env.MAINTAINER_CLIENT_IDS!).includes(msg.author.id)) {
      await msg.reply({
        content: 'Sakura is under maintenance! Please try again later.',
        allowedMentions: {
          repliedUser: false
        }
      });
      return;
    }
  }
  if (command.permissions) {
    if (!msg.member!.permissions.has(command.permissions as PermissionResolvable)) {
      await msg.reply({
        content: `Sorry but you don't have the required permissions to use that. The required permissions are: ${command.permissions.map(
          (perm: PermissionResolvable): string => `\`${perm}\``
        )}. Use the \`${
          client.servers!.get(msg.guild!.id)!.prefix
        }perms\` command to get the list of permissions you currently have.`,
        allowedMentions: {
          repliedUser: false
        }
      });
      return;
    }
  }
  try {
    const cname = command.name;
    await client.commands!.get(cname).execute({
      msg,
      client,
      cmd,
      args,
      realm,
      share
    });
  } catch (e) {
    console.error(e);
    await msg.reply({
      content: 'Hmm...seems like an internal error! Please try again later.',
      allowedMentions: {
        repliedUser: false
      }
    });
  }
}
