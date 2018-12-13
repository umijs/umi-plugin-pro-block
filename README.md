# umi-plugin-pro-block

[![NPM version](https://img.shields.io/npm/v/umi-plugin-pro-block.svg?style=flat)](https://npmjs.org/package/umi-plugin-pro-block)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-pro-block.svg?style=flat)](https://npmjs.org/package/umi-plugin-pro-block)

A plugin for deliver umi block files like ant design pro structure.

When you use `umi block demo` to download a block, if you did not use this plugin, you will get:

```diff
- src
  - mock
  - pages
+   - demo
+     - index.js
+     - _mock.js
+     - service.js
```

And if you use it, you will get:

```diff
- src
  - mock
+   - demo.js
  - service.js
+   - demo.js
  - pages
+   - demo
+     - index.js
```

Ant will replace `umi-request` to `util(s)/request.js` if it exist.

## Usage

Configure in `.umirc.js`,

```js
export default {
  plugins: [
    ['umi-plugin-pro-block', {}],
  ],
}
```

## Options

{}

## LICENSE

MIT
