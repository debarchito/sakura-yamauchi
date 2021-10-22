import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { ShardingManager } from 'discord.js';

import type { Shard } from 'discord.js';

dotenv.config({
  path: resolve(resolve(), '../.env')
});

const manager = new ShardingManager('./sakura.js', {
  token: process.env.RUNTIME === 'prod' ? process.env.TOKEN : process.env.TEST_TOKEN
});

manager.on('shardCreate', (shard: Shard): void =>
  console.log(`[?] (ShardingManager) Launched shard no. ${+shard.id + 1}!`)
);

manager.spawn();
