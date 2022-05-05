import type { Command } from "$types";

const command: Command.Init = {
  alias: ["pr"],
  description: "Get the registered prefix!",
  usage: "```{prefix}prefix```",
  async execute({ msg, client, share: { prefix } }) {
    msg.reply({
      content: `The prefix is: ${prefix(msg, client)}`
    });
  }
};

export default command;
