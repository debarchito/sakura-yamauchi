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
    let rows = 8, columns = 8;
    if(len === 1) {
      let rows_temp = +args[0];
      if (isNaN(rows_temp)) {
        await msg.reply({
          content: `The first argument "${args[0]}" is not a number.`
        });
        return;
      }
      rows_temp = Math.floor(Math.abs(rows_temp))
      if(rows_temp < 4 || rows_temp > 12) {
        await msg.reply({
          content: `The number of rows should fall between 4 and 12 (inclusive)`
        });
        return;
      }
      rows = rows_temp;
    } else if(len >= 2) {
      let rows_temp = +args[0],
        columns_temp = +args[1];
      if (isNaN(rows_temp)) {
        await msg.reply({
          content: `The first argument "${args[0]}" is not a number.`
        });
        return;
      } else if(isNaN(columns_temp)) {
        await msg.reply({
          content: `The second argument "${args[1]}" is not a number.`
        });
        return;
      }
      rows_temp = Math.floor(Math.abs(rows_temp));
      columns_temp = Math.floor(Math.abs(columns_temp));
      if(rows_temp < 4 || rows_temp > 12) {
        await msg.reply({
          content: `The number of rows should fall between 4 and 12 (inclusive)`
        });
        return;
      } else if(columns_temp < 4 || columns_temp > 12) {
        await msg.reply({
          content: `The number of columns should fall between 4 and 12 (inclusive)`
        });
        return;
      }
      rows = rows_temp;
      columns = columns_temp;
    }
    const minesweeper = new Minesweeper({
      rows: rows,
      columns: columns
    });
    await msg.reply({
      content: minesweeper.start() as string
    });
  }
};

export default command;
