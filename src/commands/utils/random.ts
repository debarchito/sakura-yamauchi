import type { Command } from "$types";

const command: Command.Init = {
  alias: ["rand"],
  description: "Generates a random number between two given numbers (inclusive)",
  usage: `\`\`\`{prefix}random [0 to 10]
{prefix}random <Max> [0 to <Max>]
{prefix}random <Min> <Max> [<Min> to <Max>]\`\`\``,
  async execute({ args, msg, share: { random } }) {
    const len = args.length;

    if (len) {
      if (!args.slice(0, 2).every(Number)) {
        msg.reply({
          content: "This command only accepts numeric arguments."
        });
        return;
      }
    }

    let min = 0,
      max = 10;

    if (len === 1) {
      max = Math.floor(Math.abs(+args[0]));
    } else if (len >= 2) {
      min = Math.floor(Math.abs(+args[0]));
      max = Math.floor(Math.abs(+args[1]));
    }

    msg.reply({
      content: `Your random number (min: ${min!}, max: ${max}) is: ${random(min, max)}`
    });
  }
};

export default command;
