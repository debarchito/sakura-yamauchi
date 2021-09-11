import { readdir } from 'fs/promises';
import { resolve } from 'path';
import { type as osType } from 'os';

import type { Event } from '$types';

export default async function eventsLoader({ client, realm }: Event.Loader): Promise<void> {
    try {
        const events = (await readdir('./events')).filter(file => file.endsWith('.js'));
        for(const file of events) {
            const src = resolve(resolve(), `./events/${file}`),
            { default: event }: { default: Event.Init } = await import(osType() === 'Windows_NT' ? `file://${src}` : src);
            let name = event.name ? event.name : file.slice(0, -3);
            // Using "any" cause the "Event.Init" interface used while declaring the events is enough
            (client as any)[event.method ? event.method : "on"](name, event.listen({ 
                client, 
                realm 
            })); 
        }
    } catch(err) {
        console.error(err);
    };
};
