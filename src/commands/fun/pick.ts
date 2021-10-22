import type { Command } from '$types';

const command: Command.Init = {
  categoryEmoji: ':postal_horn:',
  alias: ['pk'],
  description: 'Picks an argument randomly from the given arguments!',
  usage: '```{prefix}pick <Arg 1>, <Arg 2>, <Arg 3>, ...```',
  async execute({ args, msg, share: { choose } }) {
    const len = args.length;
    let message: string;
    if (len === 0)
      message = 'Didn\'t receive any arguments while expecting at least 2 arguments!';
    else if (len === 1)
      message = 'Received one argument while expecting at least 2 arguments!';
    else message = `I choose: ${choose<string>(args).slice(0, -1)}`;
    await msg.reply({
      content: message,
      allowedMentions: {
        repliedUser: false
      }
    });
  }
};

export default command;
