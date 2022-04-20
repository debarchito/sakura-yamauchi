import type { Event, Sakura } from "$types";
import type { Guild, ColorResolvable } from "discord.js";

const event: Event.Init = {
  listen({ realm, client }) {
    return async function (guild: Guild) {
      realm.write(() => {
        const server = realm.create<Sakura.Server>("guild", {
          id: guild.id,
          color: process.env.COLOR! as ColorResolvable,
          prefix: process.env.PREFIX!
        });

        client.servers!.set(guild.id, server);

        console.log(`[?] (GuildCreate) Registered new server with id "${guild.id}"!`);
      });
    };
  }
};

export default event;
