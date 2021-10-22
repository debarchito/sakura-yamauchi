import type {
  Client as DiscordClient,
  PermissionResolvable,
  ColorResolvable,
  Message,
  ClientEvents
} from 'discord.js';
import type Realm from 'realm';

export namespace Sakura {
  export interface Client extends DiscordClient {
    commands?: Collection<string, Sakura.Command>;
    categories?: Map<string, string>;
    servers?: Map<string, Sakura.Server>;
  }

  export interface Server {
    id: string;
    prefix: string;
    color: ColorResolvable;
  }
}

export namespace Command {
  export interface Init {
    name?: string;
    alias?: string[];
    description: string;
    category?: string;
    categoryEmoji?: string;
    usage: string;
    permissions?: Array<PermissionResolvable>;
    execute({}: Command.Execute): Promise<void>;
  }

  export interface Execute {
    msg: Message;
    client: Sakura.Client;
    cmd: string;
    args: string[];
    realm: Realm;
    share: Share;
  }
}

export namespace Event {
  export interface Init {
    name?: keyof ClientEvents;
    method?: keyof DiscordClient;
    listen({}: Event.Loader): (...args: any) => Promise<void>;
  }

  export interface Loader {
    client: Sakura.Client;
    realm: Realm;
    share: Share;
  }
}

export namespace XP {
  export interface Init {
    guildId: string;
    id: string;
    xp: number;
    level: number;
    requiredXp: number;
    totalXp: number;
  }
}

export interface Share {
  random(min: number, max: number): number;
  choose<T>(arr: T[]): T;
}