import type { Command } from '$types';

const command: Command.Init = {
  alias: ['rand'],
  description: 'Generate a random number!',
  usage: `\`\`\`{prefix}random [0 to 10]
{prefix}random <Max> [0 to <Max>]
{prefix}random <Min> <Max> [<Min> to <Max>]\`\`\``,
  async execute({ args, random, msg }) {
    const len: number = args!.length;
    let min: number, max: number;
    if (len === 0) {
      min = 0;
      max = 10;
    } else if (len === 1) {
      min = 0;
      const max_temp = Number(args![0]);
      if (isNaN(max_temp)) {
        await msg!.reply({
          content: `The first argument "${args![0]}" is not a number.`,
          allowedMentions: {
            repliedUser: false
          }
        });
        return;
      }
      max = Math.floor(Math.abs(max_temp));
    } else if (len >= 2) {
      const min_temp = Number(args![0]);
      const max_temp = Number(args![1]);
      if (isNaN(min_temp)) {
        await msg!.reply({
          content: `The first argument "${args![0]}" is not a number.`,
          allowedMentions: {
            repliedUser: false
          }
        });
        return;
      } else if (isNaN(max_temp)) {
        await msg!.reply({
          content: `The second argument "${args![1]}" is not a number.`,
          allowedMentions: {
            repliedUser: false
          }
        });
        return;
      }
      min = Math.floor(Math.abs(min_temp));
      max = Math.floor(Math.abs(max_temp));
    }
    const result = random!(min!, max!);
    await msg!.reply({
      content: `Your random number (min: ${min!}, max: ${max!}) is \`${result}\``,
      allowedMentions: {
        repliedUser: false
      }
    });
  }
};

export default command;
