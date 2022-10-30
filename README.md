### [QUESTIONS?]

If you have any questions regarding the project, take a look at [Q&A.md](/Q&A.md). Some of the
questions may have been answered.

### [RUN]

```bash
# Start
deno task run
# Dev
deno task dev
```

### [USAGE]

#### 1. How to add new commands?

There are basically two ways to add commands:

- Export a (default) class that extends the `Command` class -> call these `commands`
- Export a (default) class that extends the `Extension` class -> call these `extensions`

Extensions may contains more than one command, while commands contain exactly one command.
Extensions are useful when you need to add commands that need to share data between themselves
and/or can be classified as commands of a common category. e.g. music commands. Lets call them
(commands and extensions together) `loadables` for now.

#### Structure

```
loadables/
    |- utils/
    |    |- random.ts
    |    |- ping.ts
    |    |- <command_name>.ts
    |    |- <command_name_but_ignored>.i.ts
    |    |- options.json
    |    |- ...
    |
    |- music/
    |    |- music.e.ts
    |    |- <extension_name>.e.ts
    |    |- <extension_name_but_ignored>.e.i.ts
    |    |- options.json
    |    |- ...
    |
    |- <category_name>/
    |- ...
```

`commands` end with just `.ts` while `extensions` end with `.e.ts`. `.i.ts` can be added to either
`commands` or `extensions` to ignore them during loading. Directories like `utils` or `music` are
treated as categories. They are used to categorize the commands for the `help` command. Again, there
is a special `options.json` file with only two properties: `category` and `categoryEmoji`. By
default if `options.json` doesn't exist, the capitalized name of the directory is considered the
category name while categoryEmoji is empty. We can define the values in `options.json` to overwrite
the behaviour for that specific category.

#### Add commands

At this point it is better to be familiar with how [harmony](https://deno.land/x/harmony) works.
Although the type definitions are really good. You can explore those. Anyway an example:

```ts
// name.ts
import { Command } from "harmony/mod.ts";
// share.ts contains shareable functions
import { category as cat } from "@/components/share.ts";
import type { CommandContext } from "harmony/mod.ts";

export default class<Name> extends Command {
  name = "<name>";
  description = "...";
  // explore more options from type definitions
  // but...this one is a bit special
  // use this category (cat) function and leave the rest to Deno! Categorization is automagic!
  // This will respect the structure of the directory and options.json
  // (you can always check the source)
  category = cat(import.meta.url);

  execute(ctx: CommandContext) {
    // again, explore harmonyland!
  }
}
```

#### Add extensions

```ts
// name.e.ts
import { Command, Extension } from "harmony/mod.ts";
import type { CommandClient } from "harmony/mod.ts";

class <Command1> extends Command { /* ... */ }

class <Command2> extends Command { /* ... */ }

export default class <Name> extends Extension {
  name = "<name>"
  // explore harmonyland!

  constructor(client: CommandClient) {
    super(client);
    // explore, explore, explore! (Extensions can do a lot of stuff!!)
    this.commands.add(<Command1>);
    this.commands.add(<Command2>);
  }
}
```

Well that is about it (for now). Btw, Deno is cool! Much better than Node....shots fired? :P...Oh
yeah...

### [LICENSE]

MIT
