# Install :hatching_chick:

Step 1. Install the package using your favorite package manager

```bash
$ yarn add uibook-plugin
```

Step 2. Add Uibook in `webpack.config.js`

_webpack.config.js_
```js
let Uibook = require('uibook')

module.exports = {
  …
  plugins: [
    new Uibook({
      outputPath: '/uibook',
      controller: path.join(__dirname, '../src/uibook-controller.js'),
      title: 'Uibook'
    })
  ],
}
```

where:

- `controller` — path to the Uibook Controller (we’ll create it 
on the next step)
- `outputPath` _(optional)_ — directory to build Uibook files, 
the default is `uibook`
- `title` _(optional)_ — Uibook title in a browser

:warning: If you're using HtmlWebpackPlugin, it's necessary to exclude `uibook`:

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