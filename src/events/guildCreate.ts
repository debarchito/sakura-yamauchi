import type { Event, Sakura } from '$types';
import type { Guild } from 'discord.js';

const event: Event.Init = {
  listen({ realm, client }) {
    return async function (guild: Guild) {
      realm.write(() => {
        const guildCreate = realm.create<Sakura.Server>('guildCreate', {
          id: guild.id,
          color: '#FCA9F3',
          prefix: 's!'
        });
        client.servers!.set(guild.id, guildCreate);
        console.log(`[?] (GuildCreate) Registered new server with id "${guild.id}"!`);
      });
    };
  }
};

export default event;
