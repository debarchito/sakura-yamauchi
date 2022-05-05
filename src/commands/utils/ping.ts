import type { Command } from "$types";

const command: Command.Init = {
  description: "Get the latency!",
  usage: "```{prefix}ping```",
  async execute({ msg, client, share: { color } }) {
    msg.reply({
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
            text: `Requested by ${msg.author.tag}`,
            icon_url: msg!.author.displayAvatarURL()
          }
        }
      ]
    });
  }
};

export default command;
