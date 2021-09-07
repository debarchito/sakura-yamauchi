import type { Client, PermissionResolvable, Message, ColorResolvable, ClientEvents, Guild } from 'discord.js';
import type Realm from 'realm';

interface __Client extends Client { 
    commands?: Collection<string, __commands>;
}

interface __eventsLoader {
    activity?: __activity;
    client?: __Client;
    servers?: Map<string, __servers>;
    realm?: Realm;
}

interface __event {
    name: keyof ClientEvents;
    method: keyof Client;
    listen: ({}: __eventsLoader) => (...args: any) => Promise<void>;
}

interface __commands {
    name: string;
    alias?: string[];
    description: string;
    usage: string;
    examples?: string[];
    permissions?: PermissionResolvable;
    execute({}: __execute): Promise<void>;
}

interface __execute {
    msg?: Message;
    client?: __Client;
    servers?: Map<string, __servers>;
    cmd?: string;
    args?: string[];
    realm?: Realm;
    random?: (min: number, max: number) => number;
}

interface __servers { 
    id: string;
    prefix: string;
    color: ColorResolvable;
}

interface __activity extends Array<{
    id: number; name: string; value: string;
}>{}

export {
    __Client,
    __servers,
    __commands,
    __event,
    __execute,
    __activity,
    __eventsLoader
}
