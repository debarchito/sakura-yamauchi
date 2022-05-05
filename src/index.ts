import * as dotenv from "dotenv";
import { resolve } from "node:path";
import { ShardingManager } from "discord.js";

dotenv.config({
  path: resolve(resolve(), "../.env")
});

const manager = new ShardingManager("./sakura.js", {
  token: process.env.TOKEN
});

manager.on("shardCreate", (shard) =>
  console.log(`[?] (ShardingManager) Launched shard no. ${shard.id + 1}!`)
);
manager.spawn();
