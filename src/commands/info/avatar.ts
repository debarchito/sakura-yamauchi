import type { Command } from "$types";
import type { User, ColorResolvable } from "discord.js";

const command: Command.Init = {
  alias: ["av"],
  description: "Get the avatar of an user!",
  usage: "```{prefix}avatar <@User | :author>```",
  async execute({ msg, client }) {
    const user: User = msg.mentions.users.first() || msg.author;
    const member = await msg.guild!.members.fetch(user);
    await msg.reply({
      embeds: [
        {
          color: client.servers!.get(msg.guild!.id)!.color as ColorResolvable,
          author: {
            name: `${member.user.tag}${member.nickname ? ` | ${member.nickname}` : ""}`,
            icon_url: member.user.displayAvatarURL()
          },
          title: "Direct link",
          description: `[Click here](${member.user.displayAvatarURL({
            format: "png",
            size: 1024
          })})`,
          image: {
            url: member.user.displayAvatarURL({ format: "png", size: 1024 })
          },
          footer: {
            text: `Requested by ${msg.author.tag}`,
            icon_url: msg!.author.displayAvatarURL()
          }
        }
      ]
    });
  }
};

export default command;
