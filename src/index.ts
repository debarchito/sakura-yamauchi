import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { ShardingManager } from 'discord.js';

dotenv.config({
    path: resolve(resolve(), '../.env')
});

const manager: ShardingManager = new ShardingManager('./sakura.js', {
    token: process.env.RUNTIME === 'prod' ? process.env.TOKEN : process.env.TEST_TOKEN
});

manager.on('shardCreate', shard => console.log(`[?] (index: ShardingManager) Launched ${shard.id}!`));

manager.spawn();