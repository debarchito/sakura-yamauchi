import type {
  Client as DiscordClient,
  PermissionResolvable,
  ColorResolvable,
  Message,
  ClientEvents,
  Collection
} from "discord.js";
import type Realm from "realm";

/**
 * @description The main bot namespace which only includes things related to the initialization of the bot
 */
export namespace Sakura {
  /**
   * @description An extended version of Discord.Client
   */
  export interface Client extends DiscordClient {
    /**
     * @description Collection of all commands that are loaded on boot
     */
    commands?: Collection<string, Command.Init>;
    /**
     * @description Map of all command categories that are loaded on boot
     */
    categories?: Map<string, string>;
    /**
     * @description Map of all server/guild IDs that interacted with the bot after boot
     */
    servers?: Map<string, Sakura.Server>;
  }

  /**
   * @description In-memory representation of server/guild config to reduce the amount of database queries/sec (DMs are not handled as the default global config is used)
   */
  export interface Server {
    /**
     * @description ID of the server/guild
     */
    id: string;
    /**
     * @description Registered prefix of the server/guild
     */
    prefix: string;
    /**
     * @description Registered embed color of the server/guild
     */
    color: ColorResolvable;
  }
}

/**
 * @description The main command interface which only includes things related to the command system
 */
export namespace Command {
  /**
   * @description Initialize this command
   */
  export interface Init {
    /**
     * @description Name of this command (filename by default)
     */
    name?: string;
    /**
     * @description Aliases for the default command name
     */
    alias?: string[];
    /**
     * @description Should this command be accessible in DM? (true by default)
     */
    dm?: boolean;
    /**
     * @description Description of this command (to be used in help message)
     */
    description: string;
    /**
     * @description Describe the usage of the command or simply referred as examples (to be used in help message)
     */
    usage: string;
    /**
     * @description Permissions required by the user to use this command
     */
    permissions?: Array<PermissionResolvable>;
    /**
     * @description Function to call when this command in invoked
     */
    execute(args: Command.Execute): Promise<void>;
  }

  /**
   * @description Available options under the Command.Init.execute function
   */
  export interface Execute {
    /**
     * @description The message instance
     */
    msg: Message;
    /**
     * @description An extended version of Discord.Client
     */
    client: Sakura.Client;
    /**
     * @description Name of this command
     */
    cmd: string;
    /**
     * @description Arguments received by this command
     */
    args: string[];
    /**
     * @description The main database instance
     */
    realm: Realm;
    /**
     * @description Collection of commonly used functions
     */
    share: Share;
  }
}

/**
 * @description The main event namespace that only includes things related to the event system
 */
export namespace Event {
  /**
   * @description Initialize this event
   */
  export interface Init {
    /**
     * @description Name of this event (filename by default)
     */
    name?: keyof ClientEvents;
    /**
     * @description Methods / functions available under Discord.Client
     * @example ```js
     * client.on(...) -> "on"
     * client.once(...) -> "once"
     * ```
     */
    method?: keyof DiscordClient;
    /**
     * @description Function to run when this event is invoked
     */
    listen(args: Event.Listen): (...args: any) => Promise<void>;
  }

  /**
   * @description Available options under `eventLoader` function in `$PROJECT/src/handlers/eventHandler.ts`
   * @info This interface is defined in `$types` because the `Event.Listen` interface extends this
   */
  export interface Loader {
    /**
     * @description An extended version of Discord.Client
     */
    client: Sakura.Client;
    /**
     * @description The main database instance
     */
    realm: Realm;
  }

  /**
   * @description Available options under the `Event.Init.listen` function
   */
  export interface Listen extends Loader {
    /**
     * @description Collection of commonly used functions
     */
    share: Share;
  }
}

/**
 * @description Main experience (xp) namespace
 * @warning This namespace is subject to change
 */
export namespace XP {
  /**
   * @description Initialize the experience system (database backed)
   */
  export interface Init {
    /**
     * @description ID of the server/guild
     */
    guildId: string;
    /**
     * @description ID of the user
     */
    id: string;
    /**
     * @description Experience points accumulated after the last level-up
     */
    xp: number;
    /**
     * @description Level of the user
     */
    level: number;
    /**
     * @description Required experience points to level-up
     */
    requiredXp: number;
    /**
     * @description Total experience accumulated since level 0
     */
    totalXp: number;
  }
}

/**
 * @description Collection of commonly used functions
 */
export interface Share {
  /**
   * @description Returns a random number between min and max (inclusive)
   */
  random(min: number, max: number): number;
  /**
   * @description Returns a random argument from an array of received arguments
   */
  choose<T>(...args: T[]): T;
  /**
   * @description Returns the prefix registered for a given guild or returns default prefix
   */
  prefix(msg: Message, client: Sakura.Client): string;
  /**
   * @description Returns the color registered for a given guild or returns default color
   */
  color(msg: Message, client: Sakura.Client): ColorResolvable;
}
