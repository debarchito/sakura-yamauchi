import type { Command } from "$types";

const command: Command.Init = {
  alias: ["rand"],
  description: "Generates a random number between two given limits.",
  usage: `\`\`\`{prefix}random [0 to 10]
{prefix}random <Max> [0 to <Max>]
{prefix}random <Min> <Max> [<Min> to <Max>]\`\`\``,
  async execute({ args, msg, share: { random } }) {
    const len = args.length;
    let min = 0, max = 10;
    if (len === 1) {
      const max_temp = +args[0];
      if (isNaN(max_temp)) {
        await msg.reply({
          content: `The first argument "${args[0]}" is not a number.`,
        });
        return;
      }
      max = Math.floor(Math.abs(max_temp));
    } else if (len >= 2) {
      const min_temp = +args[0];
      const max_temp = +args[1];
      if (isNaN(min_temp)) {
        await msg.reply({
          content: `The first argument "${args[0]}" is not a number.`,
          allowedMentions: {
            repliedUser: false
          }
        });
        return;
      } else if (isNaN(max_temp)) {
        await msg.reply({
          content: `The second argument "${args[1]}" is not a number.`,
          allowedMentions: {
            repliedUser: false
          }
        });
        return;
      }
      min = Math.floor(Math.abs(min_temp));
      max = Math.floor(Math.abs(max_temp));
    }
    await msg.reply({
      content: `Your random number (min: ${min!}, max: ${max!}) is \`${random(min!, max!)}\``,
      allowedMentions: {
        repliedUser: false
      }
    });
  }
};

export default command;
