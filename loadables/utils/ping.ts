import { Command } from "harmony/mod.ts";
import { category } from "@/components/share.ts";
import type { CommandContext } from "harmony/mod.ts";

export default class Ping extends Command {
  name = "ping";
  description = "Get the ping!";
  usage = "```${prefix}ping```";
  category = category(import.meta.url);

  execute(ctx: CommandContext) {
    ctx.message.reply(
      `And that's a pong :womans_hat:! Anyway, the ping is \`${ctx.client.gateway.ping}ms\` and the last ping timestamp is \`${ctx.client.gateway.lastPingTimestamp}ms\`.`,
      {
        allowedMentions: {
          replied_user: false,
        },
      },
    );
  }
}
