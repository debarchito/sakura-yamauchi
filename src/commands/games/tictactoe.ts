// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TicTacToe from "discord-tictactoe";

import type { Command } from "$types";

const ttt = new TicTacToe({ lang: "en" });

const command: Command.Init = {
  alias: ["ttt"],
  description: "Play a game of TicTacToe with a friend or the AI!",
  usage: `\`\`\`{prefix}ttt [Play with AI]
{prefix}ttt <@Friend> [Play with a friend]\`\`\``,
  async execute({ msg }) {
    ttt.handleMessage(msg);
  }
};

export default command;
