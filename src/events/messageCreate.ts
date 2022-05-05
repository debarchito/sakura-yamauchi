import xpHandler from "../handlers/xpHandler.js";
import { commandHandler } from "../handlers/commandHandler.js";

import type { Event, Sakura } from "$types";
import type { Message, ColorResolvable } from "discord.js";

const event: Event.Init = {
  listen({ client, realm }) {
    return async function (msg: Message) {
      if (msg.author.bot) {
        return;
      }

      if (msg.channel.type !== "DM") {
        await xpHandler(msg);

        const id = msg.guild!.id;

        if (!client.servers!.has(id)) {
          const search = realm.objects<Sakura.Server>("guild").filtered(`id == "${id}"`);

          if (!search.length) {
            realm.write(() => {
              const newGuild = realm.create<Sakura.Server>("guild", {
                id: id,
                color: process.env.COLOR! as ColorResolvable,
                prefix: process.env.PREFIX!
              });

              client.servers!.set(id, newGuild);
              console.log(`[event: messageCreate] Registered new server with id "${id}"`);
            });
          } else {
            client.servers!.set(id, search[0]);
          }
        }
      }

      await commandHandler({ client, realm, msg });
    };
  }
};

export default event;
