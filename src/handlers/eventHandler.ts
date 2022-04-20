import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { type } from "node:os";
import share from "./share/share.js";

import type { Event } from "$types";

/**
 * Loads all the event from the events folder
 */
export default async function eventLoader({ client, realm }: Event.Loader): Promise<void> {
  try {
    const events = readdirSync("./events").filter(file => file.endsWith(".js") && !file.endsWith(".i.js")); // ".i.js" stands for "ignore js"

    for (const file of events) {
      const src = resolve(resolve(), `./events/${file}`),
        { default: event }: { default: Event.Init } = await import(type() === "Windows_NT" ? `file://${src}` : src),
        name = event.name ? event.name : file.slice(0, -3);

      (client as any)[event.method ? event.method : "on"](
        name,
        event.listen({
          client,
          realm,
          share
        })
      );
    }
  } catch (error) {
    console.error(error);
  }
}
