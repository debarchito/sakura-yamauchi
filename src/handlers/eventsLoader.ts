import { readdir } from 'fs/promises';
import { resolve } from 'path';
import { type as osType } from 'os';

import type { __event, __eventsLoader } from '$types';

export default async function eventsLoader({ client, activity, servers, realm }: __eventsLoader): Promise<void> {
    try {
        const events = (await readdir('./events')).filter(file => file.endsWith('.js'));
        for(const file of events) {
            const src = resolve(resolve(), `./events/${file}`),
            { default: event }: { default: __event } = await import(osType() === 'Windows_NT' ? `file://${src}` : src);
            (client as any)[event.method](event.name, event.listen({ client, activity, servers, realm })); 
            // 'any' cause we are sure it's gonna work due to strict types declared in the '__event' interface
        }
    } catch(err) {
        console.log(err);
    }
}
