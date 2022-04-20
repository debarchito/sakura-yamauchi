import type { Command } from "$types";

const command: Command.Init = {
  description: "Get the latency!",
  usage: "```{prefix}ping```",
  dm: true,
  async execute({ msg, client, share: { color } }) {
    await msg.reply({
      embeds: [
        {
          color: color(msg, client),
          author: {
            name: msg.author.username,
            icon_url: msg.author.displayAvatarURL()
          },
          title: "And thats a pong! :womans_hat:",
          fields: [
            {
              name: "Latency",
              value: `${Date.now() - msg.createdTimestamp}ms`,
              inline: true
            },
            {
              name: "API Latency",
              value: `${Math.round(client.ws.ping)}ms`,
              inline: true
            }
          ],
          footer: {
            text: `${client.user!.username} (c) Debarchito`,
            icon_url: client.user!.displayAvatarURL()
          }
        }
      ]
    });
  }
};

export default command;
