import type { PermissionResolvable } from 'discord.js';
import type { __execute } from './__execute';

interface __commands {
    name: string;
    alias?: string[];
    description: string;
    usage: string;
    examples?: string[];
    permissions?: PermissionResolvable;
    //TODO: dm?: boolean;
    execute({}: __execute): Promise<void>;
}

export { __commands };