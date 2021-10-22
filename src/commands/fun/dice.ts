import type { Command } from '$types';

const command: Command.Init = {
  categoryEmoji: ':postal_horn:',
  alias: ['rolldice'],
  description: 'Rolls a dice!',
  usage: '```{prefix}dice```',
  async execute({ msg, share: { random } }) {
    await msg.reply({
      content: `:game_die: ${random(1, 6)}`,
      allowedMentions: {
        repliedUser: false
      }
    });
  }
};

export default command;
