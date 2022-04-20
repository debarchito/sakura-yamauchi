## Style Guide

A guide to preserve the style and readability of the code. This guide may be updated in the future. Thoughts and contributions to this guide are always welcomed.

#### Environment

- Node.js v16.6.0+ or latest
- pnpm v6+ or latest

#### Rules

- Use double-quotes for strings and single strings for chars.
- Cherish the `esnext` syntax.
- Use `async/await` instead of `Promise` constructors whenever possible.
- Use high-level `await` without wrapping it inside an async IIFE.
- Use `async` I/O only when needed.
- Leverage TypeScript's type-inference.
- Use strict types.
- Types should be defined within their respective namespace as interfaces.
- Use of semi-colons is highly advised.
- What to import first depends on what is being used/called first.
  - e.g. `import { a, b } from './module.js';`
  - `a() // Called first`
  - `b() // Called after "a"`
- Type imports should be placed right below module imports. After which, they can follow the same call-first-import-first principle.
- Use default export over named binding when only one item is to be exported.
- `types/index.d.ts` should contain categorical and re-usable types only. If a non-categorical interface is used only once or throughout a single file only, define it inside that file itself.
- In a file, an interface should be placed right before the logic code using it.
- Leverage TSDoc for documentation.
