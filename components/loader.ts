import type { Command, CommandClient, Extension } from "harmony/mod.ts";

/**
 * Load the loadables!
 */
export default async function load(client: CommandClient) {
  for (const category of Deno.readDirSync("./loadables")) {
    if (!category.isDirectory) {
      continue;
    }

    for (const file of Deno.readDirSync(`./loadables/${category.name}`)) {
      // ".i.ts" can be used to temporarily ignore an extension or command from being loaded
      if (!file.isFile || !file.name.endsWith(".ts") || file.name.endsWith(".i.ts")) {
        continue;
      }

      const url = `../loadables/${category.name}/${file.name}`;

      // ".e.ts" are loaded as extensions while others are loaded as commands
      if (file.name.endsWith(".e.ts")) {
        const { default: extension }: { default: Extension } = await import(url);
        client.extensions.load(extension);
      } else {
        const { default: command }: { default: Command } = await import(url);
        client.commands.add(command);
      }
    }
  }
}
