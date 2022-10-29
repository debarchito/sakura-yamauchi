import { Command } from "harmony/mod.ts";
import { category, random } from "@/components/share.ts";
import type { CommandContext } from "harmony/mod.ts";

export default class Random extends Command {
  name = "random";
  aliases = ["rand"];
  description = "Generates a random number between two given numbers (inclusive)";
  usage = `\`\`\`{prefix}random [0 to 10]
{prefix}random <Max> [0 to <Max>]
{prefix}random <Min> <Max> [<Min> to <Max>]\`\`\``;
  category = category(import.meta.url);

  execute(ctx: CommandContext) {
    const args = ctx.argString.split(/ +/);
    let len = args.length;

    // To avoid [""] occurrences
    if (!args[0]) len = 0;

    if (len) {
      if (!args.slice(0, 2).every((element) => !isNaN(Number(element)))) {
        return ctx.message.reply("This command only accepts numeric arguments");
      }
    }

    let min = 0, max = 10;

    if (len === 1) {
      max = Math.floor(+args[0]);
    } else if (len >= 2) {
      min = Math.floor(+args[0]);
      max = Math.floor(+args[1]);
    }

    if (min > max) {
      [min, max] = [max, min];
    }

    ctx.message.reply(`Your random number (min: ${min}, max: ${max}) is \`${random(min, max)}\``, {
      allowedMentions: {
        replied_user: false,
      },
    });
  }
}
