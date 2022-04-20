import * as dotenv from "dotenv";
import { resolve } from "node:path";
import { Client, Intents, Collection } from "discord.js";
import { commandLoader } from "./handlers/commandHandler.js";
import eventLoader from "./handlers/eventHandler.js";
import realm from "./realm/realm.js";

import type { Sakura } from "$types";

dotenv.config({
  path: resolve(resolve(), "../.env")
});

const client: Sakura.Client = new Client({
  partials: ["CHANNEL"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES
  ],
  allowedMentions: {
    repliedUser: false
  }
});

client.commands = new Collection();
client.categories = new Map();
client.servers = new Map();

await commandLoader(client);
await eventLoader({
  client,
  realm
});

client.login(process.env.TOKEN);
