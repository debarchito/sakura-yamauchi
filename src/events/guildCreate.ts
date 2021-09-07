import { __event, __servers } from '$types';
import type { Guild } from 'discord.js';

const event: __event = {
    method: 'on',
    name: 'guildCreate',
    listen({ realm, servers }) {
        return async function(guild: Guild) {
            realm!.write(() => {
                const guildCreate = realm!.create<__servers>('guildCreate', {
                    id: guild!.id,
                    color: '#FCA9F3',
                    prefix: 's!'
                });
                servers!.set(guild!.id, guildCreate);
                console.log(`[?] (GuildCreate) Registered new server with id "${guild!.id}"!`);
            });
        }
    }
}

export default event;
