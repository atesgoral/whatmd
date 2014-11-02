# whatmd

Module pattern probing tool

## Installation

```
npm install -g whatmd
```

### Usage

```
whatmd <JS file>
```

Pass in a JS file to probe for module defition patters. The currently checked patterns are:

1. Global exports
2. CommonJS
3. AMD

### Limitations

1. AMD probing doesn't include a proper browser window emulation environment and therefore modules relying on browser features may fail to initialize and effect probe results.
2. AMD probing cannot detect global variables defined through the use of variable assignments without `var`.
3. AMD probing cannot handle `require()` calls within module factories.
