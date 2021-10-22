import type { Command } from '$types';

const command: Command.Init = {
  categoryEmoji: ':postal_horn:',
  alias: ['toss', 'flipcoin'],
  description: 'Flip a coin!',
  usage: '```{prefix}coin```',
  async execute({ msg, share: { choose } }) {
    await msg.reply({
      content: `:coin: ${choose<string>(['Heads', 'Tails'])}`,
      allowedMentions: {
        repliedUser: false
      }
    });
  }
};

export default command;
