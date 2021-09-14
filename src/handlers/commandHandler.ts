import { readdir } from 'fs/promises';
import { resolve } from 'path';
import { type as osType } from 'os';
import messageHandler from './messageHandler.js';

import type { Sakura, Command } from '$types';
import type { Message } from 'discord.js';
import type Realm from 'realm';

interface CommandHandler {
  msg?: Message;
  client?: Sakura.Client;
  realm?: Realm;
}

export async function commandLoader(client: Sakura.Client): Promise<void> {
  try {
    const commandsDir = await readdir('./commands');
    for (const folder of commandsDir) {
      const commands = (await readdir(`./commands/${folder}`)).filter(file => file.endsWith('.js'));
      for (const file of commands) {
        const src = resolve(resolve(), `./commands/${folder}/${file}`),
          { default: command }: { default: Command.Init } = await import(
            osType() === 'Windows_NT' ? `file://${src}` : src
          );
        command.name = command.name ? command.name : file.slice(0, -3).toLowerCase();
        command.category = command.category
          ? command.category
          : folder[0].toUpperCase() + folder.slice(1).toLowerCase();
        client.commands.set(command.name, command);
        if (command.categoryEmoji)
          command.category = `${command.categoryEmoji} ${command.category}`;
        if (!client.categories!.has(command.category)) {
          client.categories!.set(command.category, `\`${command.name}\``);
        } else {
          const data = client.categories!.get(command.category);
          client.categories!.set(command.category, `${data}, \`${command.name}\``);
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}

export async function commandHandler({ msg, client, realm }: CommandHandler): Promise<void> {
  if (!msg!.author.bot) {
    const content = msg!.content.trim(),
      client_id =
        process.env.RUNTIME === 'prod' ? process.env.CLIENT_ID : process.env.TEST_CLIENT_ID;
    if (content.toLowerCase().startsWith(client!.servers!.get(msg!.guild!.id)!.prefix)) {
      const [cmd, ...args] = content
        .slice(client!.servers!.get(msg!.guild!.id)!.prefix.length)
        .trim()
        .split(/ +/);
      await messageHandler({
        msg,
        client,
        cmd: cmd.toLowerCase(),
        args,
        realm
      });
    } else if (content.toLowerCase().startsWith(`<@!${client_id}>`)) {
      const [cmd, ...args] = content.slice(`<@!${client_id}>`.length).trim().split(/ +/);
      await messageHandler({
        msg,
        client,
        cmd: cmd.toLowerCase(),
        args,
        realm
      });
    }
  }
}
