import { MessageEmbedOptions, PermissionResolvable } from "discord.js";
import share from "./share/share.js";

import type { Sakura, Command } from "$types";
import type { Message } from "discord.js";
import type Realm from "realm";

interface MessageHandler {
  msg: Message;
  client: Sakura.Client;
  cmd: string;
  args: string[];
  realm: Realm;
}

/**
 * @description Handles the names and arguments extracted from messages
 */
export default async function messageHandler({ msg, client, cmd, args, realm }: MessageHandler) {
  // The special help command
  if (cmd === "help") {
    // The default help message
    if (!args.length) {
      const embed: MessageEmbedOptions = {
        author: {
          name: `Help Utility`,
          icon_url: client.user!.displayAvatarURL()
        },
        description: `"Right now, I, as formed as such, am living in this moment, I am living through our choices, right now, right here, you, and me as well, are living."`,
        color: share.color(msg, client),
        fields: [],
        thumbnail: {
          url: client.user!.displayAvatarURL()
        },
        footer: {
          text: `To view the documentation of a command, type "${share.prefix(
            msg,
            client
          )}help <command | alias>"`
        }
      };

      for (const [category, command] of client.categories!) {
        embed.fields!.push({
          name: category,
          value: command
        });
      }

      await msg.reply({
        embeds: [embed]
      });
      return;
    }

    // The dynamic help message (help with arguments)

    const command: Command.Init | undefined =
      client.commands!.get(args[0]) ||
      client.commands!.find(
        (command: Command.Init) => !!command.alias && command.alias.includes(args[0])
      );

    if (!command) {
      await msg.reply({
        content: `The command \`${args[0]}\` doesn't exist.`
      });
      return;
    }

    const fields: {
      name: string;
      value: string;
    }[] = [];

    if (command.alias) {
      fields.push({
        name: "Alias(es)",
        value: command.alias.map((item) => `\`${item}\``).join(", ")
      });
    }

    fields.push(
      {
        name: "Description",
        value: command.description
      },
      {
        name: "Usage",
        // replace {tags} with their values
        value: command.usage.replace(/\{(prefix|color)\}/gm, (_: string, tag: string): string => {
          if (tag === "prefix") {
            return share.prefix(msg, client);
          } else if (tag === "color") {
            return share.color(msg, client) as string;
          } else {
            // End string must not include tags
            return "";
          }
        })
      }
    );

    await msg.reply({
      embeds: [
        {
          author: {
            name: `Help Utility`,
            icon_url: client!.user!.displayAvatarURL()
          },
          title: `Documentation for "${command.name}"`,
          color: share.color(msg, client),
          fields: fields,
          thumbnail: {
            url: client!.user!.displayAvatarURL()
          },
          footer: {
            text: `Requested by ${msg!.author.tag}`,
            icon_url: msg!.author.displayAvatarURL()
          }
        }
      ]
    });
    return;
  }

  const command: Command.Init | undefined =
    client.commands!.get(cmd) ||
    client.commands!.find((cm: Command.Init) => !!cm.alias && cm.alias.includes(cmd!));

  if (!command) {
    return;
  }

  if (process.env.MAINTENANCE !== "off") {
    if (!JSON.parse(process.env.MAINTAINER_CLIENT_IDS!).includes(msg.author.id)) {
      msg.reply({
        content: "Sakura is under maintenance! Please try again later."
      });
      return;
    }
  }

  if(typeof command.dm === "boolean" && !command.dm) {
    msg.reply({
      content: "This command is not available for DMs."
    });
    return;
  }

  if (command.permissions) {
    if (!msg.member!.permissions.has(command.permissions as PermissionResolvable)) {
      await msg.reply({
        content: `Sorry but you don't have the required permissions to use that. The required permissions are: ${command.permissions.map(
          (perm: PermissionResolvable): string => `\`${perm}\``
        )}. Use the \`${share.prefix(
          msg,
          client
        )}perms\` command to get the list of permissions you currently have.`
      });
      return;
    }
  }

  try {
    const commandName = command.name!;
    await client.commands!.get(commandName)!.execute({
      msg,
      client,
      cmd,
      args,
      realm,
      share
    });
  } catch (error) {
    console.error(error);
    await msg.reply({
      content: "Hmm...seems like an internal error! Please try again later."
    });
  }
}
