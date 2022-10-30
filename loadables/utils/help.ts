//! INCOMPLETE COMMAND!

import { Command } from "harmony/mod.ts";
import type { CommandContext, EmbedPayload } from "harmony/mod.ts";

export default class Help extends Command {
  name = "help";

  execute(ctx: CommandContext) {
    let args = ctx.argString.split(/ +/);

    if (!args[0]) args = [];

    if (!args.length) {
      const embed: EmbedPayload = {
        author: {
          name: `Help Utility`,
          icon_url: ctx.client.user?.avatarURL(),
        },
        description:
          `"Right now, I, as formed as such, am living in this moment, I am living through our choices, right now, right here, you, and me as well, are living."`,
        color: Number(Deno.env.get("COLOR")),
        fields: [],
        thumbnail: {
          url: ctx.client.user?.avatarURL(),
        },
        footer: {
          text:
            `To view the documentation of a command, type "${ctx.prefix}help <command | alias>"`,
        },
      };

      ctx.channel.send({
        embeds: [embed],
      }, {
        allowedMentions: {
          replied_user: false,
        },
      });
    }
  }
}
