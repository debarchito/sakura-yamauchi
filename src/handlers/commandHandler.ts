import { existsSync, readdirSync } from "fs";
import { resolve } from "path";
import { type } from "os";
import messageHandler from "./messageHandler.js";

import type { Sakura, Command } from "$types";
import type { Message } from "discord.js";
import type Realm from "realm";

/**
 * @description Loads all the command files from the commands folder and categorizes them
 */
export async function commandLoader(client: Sakura.Client) {
  const commandsDir = readdirSync("./commands");

  for (const folder of commandsDir) {
    const commands = readdirSync(`./commands/${folder}`).filter(
        // .i.js stands for "ignore js"
        // Test files that are not supposed to run during production should end with .i.js or .i.ts in src files
        (file) => file.endsWith(".js") && !file.endsWith(".i.js")
      ),
      optionsJson = resolve(resolve(), `./commands/${folder}/options.i.js`),
      // Default category options; folder name is the default category name (capitalized first letter)
      // No category emoji by default
      options = {
        category: folder[0].toUpperCase() + folder.slice(1).toLowerCase(),
        categoryEmoji: ""
      };

    if (existsSync(optionsJson)) {
      // Over-write the default category options if provided
      const { default: optionsConfig }: { default: typeof options } = await import(
        type() === "Windows_NT" ? `file://${optionsJson}` : optionsJson
      );
      Object.assign(options, optionsConfig);
    }

    if (options.categoryEmoji) {
      // Use category emoji only if it is provided; default empty string
      options.category = `${options.categoryEmoji} ${options.category}`;
    }

    if (!client.categories!.has(options.category)) {
      // The value is a string of `quoted command names` separated via comma
      client.categories!.set(options.category, "");
    }

    for (const file of commands) {
      const src = resolve(resolve(), `./commands/${folder}/${file}`),
        { default: command }: { default: Command.Init } = await import(
          type() === "Windows_NT" ? `file://${src}` : src
        );

      // Filename is the default command name
      command.name = command.name ? command.name : file.slice(0, -3).toLowerCase();
      const categories = client.categories!.get(options.category)!;
      // Append new `quoted command name` to category string separated by comma
      client.categories!.set(
        options.category,
        categories.length === 0 ? `\`${command.name}\`` : `${categories}, \`${command.name}\``
      );
      // Load command in memory
      client.commands!.set(command.name, command);
    }
  }
}

interface CommandHandler {
  msg: Message;
  client: Sakura.Client;
  realm: Realm;
}

/**
 * @description Handles the incoming message and splits them into name and arguments
 */
export async function commandHandler({ msg, client, realm }: CommandHandler) {
  if (msg.author.bot) {
    return;
  }

  const content = msg.content.trim(),
    // We don't need the whole string here, in-case a user sends a very large text
    // We just need the first few characters to check if it's the prefix or the bot id
    check = content.substring(0, 30).toLowerCase(),
    // Check for prefix in guilds only; use default prefix for DMs
    prefix = msg.guild ? client.servers!.get(msg.guild.id)!.prefix : process.env.PREFIX!,
    // "!" is optional as it is only required when the user has a nickname
    regex = RegExp(`^<@!?${client.user!.id}>`),
    test = regex.test(check);

  if (check.startsWith(prefix) || test) {
    let message: string[];

    if (!test) {
      message = content.slice(prefix.length).trim().split(/\s+/);
    } else {
      message = content.slice(check.match(regex)![0].length).trim().split(/\s+/);
    }

    const [cmd, ...args] = message;

    await messageHandler({
      msg,
      client,
      // Ensures command name is case-insensitive
      cmd: cmd.toLowerCase(),
      args,
      realm
    });
  }
}
