import "dotenv/load.ts";
import { CommandClient } from "harmony/mod.ts";
import { activity, activityInterval } from "@/components/activity.ts";
import { random } from "@/components/share.ts";
import load from "@/components/loader.ts";

const client = new CommandClient({
  prefix: JSON.parse(Deno.env.get("PREFIXES")!),
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS",
    "DIRECT_MESSAGES",
  ],
  token: Deno.env.get("MAINTENANCE") === "on"
    ? Deno.env.get("MAINTENANCE_TOKEN")
    : Deno.env.get("TOKEN"),
});

/**** Load the commands and/or extensions ****/
await load(client);

client.on("ready", () => {
  client.setPresence({
    activity: {
      name: activity[0].value,
      type: activity[0].id,
    },
    status: "idle",
  });

  // Change activity under certain interval
  setInterval(() => {
    const i = random(0, activity.length - 1);

    client.setPresence({
      activity: {
        name: activity[i].value,
        type: activity[i].id,
      },
      status: "idle",
    });
  }, activityInterval);

  console.log("[event:ready] Client is ready...");
});

client.connect();
