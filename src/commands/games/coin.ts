import type { Command } from "$types";

const command: Command.Init = {
  alias: ["toss", "flipcoin"],
  description: "Flip a coin!",
  usage: "```{prefix}coin```",
  async execute({ msg, share: { choose } }) {
    msg.reply({
      content: `:coin: ${choose<string>("Heads", "Tails")}.`
    });
  }
};

export default command;
