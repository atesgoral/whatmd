# whatmd

Module pattern probing tool

## Motivation

To figure out which JS module definition standards a module complies with. Could be useful when developing your own Node, Bower, etc. modules or when you're troubleshooting why attempts at including a third-party module keep failing.

This is not meant to be a comprehensive diagnostic tool, but an optimistic helper to give you a high-level overview.

## Installation

```
npm install -g whatmd
```

### Usage

```
whatmd <JS file>
```

Pass in a JS file to probe for module definition patters. The currently checked patterns are:

1. Global exports
2. CommonJS
3. AMD

### Limitations

1. AMD probing doesn't include a proper browser window emulation environment and therefore modules relying on browser features may fail to initialize and effect probe results.
2. AMD probing cannot detect global variables defined through the use of variable assignments without `var`.
3. AMD probing cannot handle `require()` calls within module factories.
4. No pretty output yet. Just dumps a JS object with a bunch of undocumented properties.
