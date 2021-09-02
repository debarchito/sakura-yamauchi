import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { Client, Intents, Collection } from 'discord.js';
import type { Guild, Message } from 'discord.js';
import type { __Client, __servers, __commands } from '$types';
import { commandsLoader, commandHandler } from './handlers/commandHandler.js';
import activity from './dialogues/activity.js';
import realm from './realm/index.js';

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

client.commands = new Collection();
await commandsLoader(client);

client.once('ready', async (): Promise<void> => {
    client.user!.setActivity(activity[0].value, {
        type: activity[0].id 
     });
     setInterval((): void => {
         let i: number = Math.floor(Math.random() * (activity.length - 1) + 1);
         client.user!.setActivity(activity[i].value, {
             type: activity[i].id 
         });
     }, 15000);
     console.log('[?] (sakura: Once<Ready>) Client is ready!');
});

client.on('guildCreate', async (guild: Guild): Promise<void> => {
    realm.write(() => {
        const guildCreate: __servers = realm.create('guildCreate', {
            id: guild.id
        });
        servers.set(guild.id, guildCreate);
        console.log(`[?] (sakura: On<guildCreate>) Registered new server with id "${guild.id}"!`);
    });
});

const servers = new Map<string, __servers>();

client.on('messageCreate', async (msg: Message): Promise<void> => {
    const id = msg.guild!.id;
    if(!servers.has(id)) {
        const search = realm.objects('guildCreate').filtered(`id == "${id}"`);
        if(!search.length) {
            realm.write(() => {
                const guildCreate: __servers = realm.create('guildCreate', {
                    id: id
                });
                servers.set(id, guildCreate);
                console.log(`[?] (sakura: Event<messageCreate>) Registered new server with id "${id}"!`);
            });
        } else {
            servers.set(id, search[0]);
        };
    };
    //TODO: servers.get(id) is undefined in commandHandler
    await commandHandler({ msg, client, servers, realm });
});

client.login(process.env.RUNTIME === 'prod' ? process.env.TOKEN : process.env.TEST_TOKEN);
