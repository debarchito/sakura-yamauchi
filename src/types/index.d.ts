import type { Client as DiscordClient, PermissionResolvable, ColorResolvable, Message, ClientEvents } from 'discord.js';
import type Realm from 'realm';

export namespace Sakura {
    export interface Client extends DiscordClient {
        commands?: Collection<string, Sakura.Command>;
        categories?: Map<string, string>;
        servers?: Map<string, Sakura.Server>
    };

    export interface Command {
        name?: string;
        alias?: string[];
        description: string;
        category?: string;
        usage: string;
        permissions?: Array<PermissionResolvable>;
        execute({}: Sakura.Execute): Promise<void>;
    };

    export interface Server {
        id: string;
        prefix: string;
        color: ColorResolvable;
    };

    export interface Execute {
        msg?: Message;
        client?: Sakura.Client;
        cmd?: string;
        args?: string[];
        realm?: Realm;
        random?(min: number, max: number): number;
    };
};

export namespace Command {
    export interface Handler {
        client?: Sakura.Client;
        msg?: Message;
        realm?: Realm;
    };
};

export namespace Event {
    export interface Init {
        name?: keyof ClientEvents;
        method?: keyof DiscordClient;
        listen({}: Event.Loader): (...args: any) => Promise<void>;
    };

    export interface Loader {
        client?: Discord.Client;
        realm?: Realm;
    };
};
