import type { __Client } from './__Client';
import type { __servers } from './__servers';
import type { Message } from 'discord.js';

interface __execute {
    msg: Message;
    client: __Client;
    servers: Map<string, __servers>;
    cmd: string;
    args: string[];
    realm: any; //TODO: Un-"any"-ify Realm in future
}

export { __execute };