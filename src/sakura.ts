import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { Client, Intents, Collection } from 'discord.js';
import { commandsLoader } from './handlers/commandHandler.js';
import eventsLoader from './handlers/eventsLoader.js';
import activity from './dialogues/activity.js';
import realm from './realm/realm.js';

import type { __Client, __commands, __servers } from '$types';

dotenv.config({
    path: resolve(resolve(), '../.env')
});

const client: __Client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.commands = new Collection<string, __commands>();
const servers = new Map<string, __servers>();

await commandsLoader(client);
await eventsLoader({ 
    client,
    activity,
    servers,
    realm
});

client.login(process.env.RUNTIME === 'prod' ? process.env.TOKEN : process.env.TEST_TOKEN);