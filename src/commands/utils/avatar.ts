import type { Command } from "$types";

const command: Command.Init = {
  alias: ["av"],
  dm: false,
  description: "Get the avatar of an user!",
  usage: "```{prefix}avatar <@User> [Defaults to author]```",
  async execute({ msg, client, share: { color } }) {
    const user = msg.mentions.users.first() || msg.author,
      member = await msg.guild!.members.fetch(user);

    msg.reply({
      embeds: [
        {
          color: color(msg, client),
          author: {
            name: `${member.user.tag}${member.nickname ? ` | ${member.nickname}` : ""}`
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
