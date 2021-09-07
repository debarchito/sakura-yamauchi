import { commandHandler } from '../handlers/commandHandler.js';

import type { __event, __servers } from '$types';
import type { Message } from 'discord.js';

const event: __event = {
    method: 'on',
    name: 'messageCreate',
    listen({ servers, realm, client }) {
        return async function(msg: Message) {
            const id = msg!.guild!.id;
            if(!servers!.has(id)) {
                const search = realm!.objects<__servers>('guildCreate').filtered(`id == "${id}"`);
                if(!search.length) {
                    realm!.write(() => {
                        const guildCreate = realm!.create<__servers>('guildCreate', {
                            id: id,
                            color: '#FCA9F3',
                            prefix: 's!'
                        });
                        servers!.set(id, guildCreate);
                        console.log(`[?] (MessageCreate) Registered new server with id "${id}"!`);
                    });
                } else {
                    servers!.set(id, search[0]);
                };
            }
            await commandHandler({ msg, servers, realm, client });
        }
    }
}

export default event;
