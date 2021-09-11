import { commandHandler } from '../handlers/commandHandler.js';

import type { Sakura, Event } from '$types';
import type { Message } from 'discord.js';

const event: Event.Init = {
    listen({ client, realm }) {
        return async function(msg: Message) {
            const id = msg!.guild!.id;
            if(!client!.servers!.has(id)) {
                const search = realm!.objects<Sakura.Server>('guildCreate').filtered(`id == "${id}"`);
                if(!search.length) {
                    realm!.write(() => {
                        const guildCreate = realm!.create<Sakura.Server>('guildCreate', {
                            id: id,
                            color: '#FCA9F3',
                            prefix: 's!'
                        });
                        client!.servers!.set(id, guildCreate);
                        console.log(`[?] (MessageCreate) Registered new server with id "${id}"!`);
                    });
                } else {
                    client!.servers!.set(id, search[0]);
                };
            };
            await commandHandler({ client, realm, msg });
        };
    }
};

export default event;
