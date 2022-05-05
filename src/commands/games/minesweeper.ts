import Minesweeper from "discord.js-minesweeper";

import type { Command } from "$types";

const command: Command.Init = {
  alias: ["ms"],
  description: "Generate a board of minesweeper!",
  usage: `\`\`\`{prefix}minesweeper [8 by 8]
{prefix}minesweeper <Rows> [<Rows> by 8]
{prefix}minesweeper <Rows> <Columns> [<Rows> by <Columns>]

NOTE: Values should lie between 4 and 12 (inclusive)\`\`\``,
  async execute({ args, msg }) {
    const len = args.length;

    if (len) {
      const requiredArgs = args.slice(0, 2);

      if (!requiredArgs.every(Number)) {
        msg.reply({
          content: "This command only accepts numeric arguments!"
        });
        return;
      } else if (!requiredArgs.every((n) => +n >= 4 && +n <= 12)) {
        msg.reply({
          content: "Arguments should lie between 4 and 12 (inclusive)!"
        });
        return;
      }
    }

    let rows = 8,
      columns = 8;

    if (len === 1) {
      rows = Math.floor(Math.abs(+args[0]));
    } else if (len >= 2) {
      rows = Math.floor(Math.abs(+args[0]));
      columns = Math.floor(Math.abs(+args[1]));
    }

    const minesweeper = new Minesweeper({
      rows: rows,
      columns: columns
    });

    msg.reply({
      content: minesweeper.start() as string
    });
  }
};

export default command;
