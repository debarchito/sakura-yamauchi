## Style Guide

A guide to preserve the style and readability of the code. This guide may be updated in the future. Not like it's perfect. Thoughts and contributions to this guide are always welcomed.

##### Requirements

- Node.js v16.6+ or latest
- pnpm v6+ or latest

##### NOTE: None of the options mentioned below are mandatory if you don't plan to contribute to the project.

- Use single-quotes instead of double-quotes for strings whenever possible.
- Cherish the `esnext` syntax.
- Use `async/await` instead of `Promise` constructors whenever possible.
- Use high-level `await` without wrapping it inside an async IIFE.
- Avoid `sync` I/O whenever possible.
- Use strict types with no or less implicitness.
- Types should be defined within their respective namespaces.
- Use of semi-colons is highly advised.
- What to import first depends on what will be used/called first.
  - e.g. `import { a, b } from './module.js';`
  - `a() // Called first`
  - `b() // Called after "a"`
- Type imports should be placed below all module imports. After which, they can follow the same import-first-call-first principle.
- Use default export over named binding when only one item is to be exported.
- `types/index.d.ts` should contain re-usable types only. If an interface is used only once or throughout a single file only, define it inside that file itself.
- In a file, the interfaces should be placed right below the imports followed by the logic code.
