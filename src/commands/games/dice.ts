import type { Command } from "$types";

const command: Command.Init = {
  alias: ["rolldice"],
  description: "Rolls a dice!",
  usage: "```{prefix}dice```",
  async execute({ msg, share: { random } }) {
    msg.reply({
      content: `:game_die: ${random(1, 6)}.`
    });
  }
};

export default command;
