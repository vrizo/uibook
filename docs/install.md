# Install :hatching_chick:

Step 1. Install the package using your favorite package manager

```bash
$ yarn add uibook
```

Step 2. Add Uibook in `webpack.config.js`

_webpack.config.js_
```js
let UibookPlugin = require('uibook/plugin')

module.exports = {
  …
  plugins: [
    new UibookPlugin({
      isFixedHeader: true,
      controller: path.join(__dirname, '../src/uibook-controller.js'),
      outputPath: '/uibook',
      title: 'Uibook',
      hot: true
    })
  ],
}
```

where:

- `controller` — **path to the Uibook Controller** (we’ll create it
on the next step)
- `isFixedHeader` _(optional)_ — enables or disables sticky header,
the default is `true`
- `outputPath` _(optional)_ — directory to build Uibook files,
the default is `uibook`
- `title` _(optional)_ — Uibook title in a browser
- `hot` _(optional)_ — enable `webpack-dev-server` hot reload feature

:warning: If you’re using HtmlWebpackPlugin, it’s necessary to exclude `uibook`:

_webpack.config.js_
```js
new HtmlWebpackPlugin({
  excludeChunks: ['uibook']
})
```

Nice work! You’ve installed Uibook just now.
Now we can [configure it](configure.md).

---

[← Back to the main page](../README.md)

**[Next: Configuration →](configure.md)**
