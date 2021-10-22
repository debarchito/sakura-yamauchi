import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { Client, Intents, Collection } from 'discord.js';
import { commandLoader } from './handlers/commandHandler.js';
import eventLoader from './handlers/eventLoader.js';
import realm from './realm/realm.js';
import share from './handlers/share/index.js';

import type { Sakura, Command } from '$types';

dotenv.config({
  path: resolve(resolve(), '../.env')
});

const client: Sakura.Client = new Client({
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MEMBERS, 
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

client.commands = new Collection<string, Command.Init>();
client.categories = new Map<string, string>();
client.servers = new Map<string, Sakura.Server>();

await commandLoader(client);
await eventLoader({
  client,
  realm,
  share
});

client.login(process.env.RUNTIME === 'prod' ? process.env.TOKEN : process.env.TEST_TOKEN);
