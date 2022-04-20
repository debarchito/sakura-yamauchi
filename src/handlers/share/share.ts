import type { Share } from "$types";
import type { ColorResolvable } from "discord.js";

const share: Share = {
  random: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  choose: (...args) => args[Math.floor(Math.random() * args.length)],
  prefix(msg, client) {
    if (msg.channel.type === "DM") return process.env.PREFIX!;
    return client.servers!.get(msg.guild!.id)!.prefix;
  },
  color(msg, client) {
    if (msg.channel.type === "DM") return process.env.COLOR! as ColorResolvable;
    return client.servers!.get(msg.guild!.id)!.color;
  }
};

export default share;
