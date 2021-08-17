# p8-to-js

> Convert .p8 files to .js files for use in other projects.

This simple command-line converter is intended to be used in build pipelines, CLI tools, and any
other context where converting from `.p8` to `.js` is useful.

## CLI Usage

```console
npx p8-to-js cart.p8 cart.js
```

## Options

### --export

You can export ready-to-use JavaScript in a variety of different styles -- pick the one that best
suits your codebase from the list below.

(If none of these options meets your needs, you might consider using the API instead of the CLI --
see the API documentation below.)

#### Default Export (default)

Command line:

```console
npx p8-to-js cart.p8 cart.js
npx p8-to-js cart.p8 cart.js --export default
```

Output:

```js
export default { gfx: '....', lua: '....', sfx: '....', music: '....' };
```

Usage:

```js
import Cart from './cart';
```

#### Named export (custom constant)

Command line:

```console
npx p8-to-js cart.p8 cart.js --export Cart
```

Output:

```js
export const Cart = { gfx: '....', lua: '....', sfx: '....', music: '....' };
```

Usage:

```js
import { Cart } from './cart';
```

#### CommonJS (nodejs/require style)

Command line:

```console
npx p8-to-js cart.p8 cart.js --export commonjs
```

Output:

```js
module.exports = { gfx: '....', lua: '....', sfx: '....', music: '....' };
```

Usage:

```js
const Cart = require('./cart');
```

#### JSON

Command line:

```console
npx p8-to-js cart.p8 cart.json --export json
```

Output:

```js
{
  "gfx": "....",
  "lua": "....",
  "sfx": "....",
  "music": "...."
}
```

Usage:

```js
const Cart = require("./cart.json");
```

### --encoding

Specify `hex` or `base64` encoding. Hex is the default (the output looks exactly like the `.p8` file).

Specifying
