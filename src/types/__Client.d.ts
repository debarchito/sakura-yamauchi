import type { Client, Collection } from 'discord.js';
import type { __commands } from './__commands';

interface __Client extends Client { 
    commands?: Collection<string, __commands>;
}

export { __Client };