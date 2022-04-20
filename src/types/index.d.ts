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
 * Main bot namespace
 */
export namespace Sakura {
  /**
   * An extended version of Discord.Client
   */
  export interface Client extends DiscordClient {
    /**
     * Collection of all commands
     */
    commands?: Collection<string, Command.Init>;
    /**
     * Collection of all command categories
     */
    categories?: Map<string, string>;
    /**
     * Collection of guild IDs that interacted with the bot after the last restart
     */
    servers?: Map<string, Sakura.Server>;
  }

  /**
   * In-memory representation of guild details
   */
  export interface Server {
    /**
     * ID of the guild
     */
    id: string;
    /**
     * Registered prefix of the guild
     */
    prefix: string;
    /**
     * Registered embed color of the guild
     */
    color: ColorResolvable;
  }
}

/**
 * Main command interface
 */
export namespace Command {
  /**
   * Command initialization
   */
  export interface Init {
    /**
     * Name of the command (filename by default)
     */
    name?: string;
    /**
     * Aliases for the default command name
     */
    alias?: string[];
    /**
     * Should the command be accessible in DM? (true by default)
     */
    dm?: boolean;
    /**
     * Description of the command (to be used in help message)
     */
    description: string;
    /**
     * Describe the usage of the command (to be used in help message)
     */
    usage: string;
    /**
     * Permissions required to use the command
     */
    permissions?: Array<PermissionResolvable>;
    /**
     * Execute the command
     */
    execute(args: Command.Execute): Promise<void>;
  }

  /**
   * Available options under the execute function
   */
  export interface Execute {
    /**
     * Message instance
     */
    msg: Message;
    /**
     * An extended version of Discord.Client
     */
    client: Sakura.Client;
    /**
     * Name of the command
     */
    cmd: string;
    /**
     * Arguments received by the command
     */
    args: string[];
    /**
     * Main database instance
     */
    realm: Realm;
    /**
     * Collection of commonly used function
     */
    share: Share;
  }
}

/**
 * Main event namespace
 */
export namespace Event {
  /**
   * Event initialization
   */
  export interface Init {
    /**
     * Name of the event
     */
    name?: keyof ClientEvents;
    /**
     * Methods / functions available under Discord.Client (which will be called)
     */
    method?: keyof DiscordClient;
    /**
     * Listen to the event
     */
    listen(args: Event.Listen): (...args: any) => Promise<void>;
  }

  /**
   * Interface for events loaded
   */
  export interface Loader {
    /**
     * An extended version of Discord.Client
     */
    client: Sakura.Client;
    /**
     * Main database instance
     */
    realm: Realm;
  }

  /**
   * Available options under the listen function
   */
  export interface Listen extends Loader {
    /**
     * Collection of commonly used functions
     */
    share: Share;
  }
}

/**
 * Main experience (xp) namespace
 * @info This namespace is subject to change
 */
export namespace XP {
  /**
   * Experience initialization
   */
  export interface Init {
    /**
     * ID of the guild
     */
    guildId: string;
    /**
     * ID of the user
     */
    id: string;
    /**
     * Experience points accumulated after the last level-up
     */
    xp: number;
    /**
     * Level of the user
     */
    level: number;
    /**
     * Required experience points to level-up
     */
    requiredXp: number;
    /**
     * Total experience accumulated since level 0
     */
    totalXp: number;
  }
}

/**
 * Collection of commonly used functions
 */
export interface Share {
  /**
   * Returns a random number between min and max (inclusive)
   */
  random(min: number, max: number): number;
  /**
   * Returns an random argument from an array of received arguments
   */
  choose<T>(...args: T[]): T;
  /**
   * Returns the prefix registered for a given guild or returns default prefix
   */
  prefix(msg: Message, client: Sakura.Client): string;
  /**
   * Returns the color registered for a given guild or returns default color
   */
  color(msg: Message, client: Sakura.Client): ColorResolvable;
}
