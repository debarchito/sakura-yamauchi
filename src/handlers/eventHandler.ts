import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { type } from "node:os";
import share from "./share/share.js";

import type { Event } from "$types";

/**
 * @description Loads all the event from the events folder
 */
export default async function eventLoader({ client, realm }: Event.Loader) {
  try {
    const events = readdirSync("./events").filter(
      // .i.js stands for "ignore js"
      // Test files that are not supposed to run during production should end with .i.js or .i.ts in src files
      (file) => file.endsWith(".js") && !file.endsWith(".i.js")
    );

    for (const file of events) {
      const src = resolve(resolve(), `./events/${file}`),
        { default: event }: { default: Event.Init } = await import(
          type() === "Windows_NT" ? `file://${src}` : src
        ),
        name = event.name ? event.name : file.slice(0, -3);

      // Using "any" here as we know it is safe to call it here but TypeScript doesn't
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
