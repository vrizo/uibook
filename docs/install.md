# Installation :hatching_chick:

Step 1. Uibook is not released yet, but you can install it as git dependency

```bash
$ yarn add https://github.com/vrizo/uibook
```

Step 2. Add Uibook in `webpack.config.js`

```js
const Uibook = require('uibook')

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

- `controller` — path to the Uibook Controller (we’ll create on the next step)
- `outputPath` _(optional)_ — directory to build Uibook files
- `title` _(optional)_ — title of Uibook Pages in a browser

 :warning: If you're using HtmlWebpackPlugin, it's necessary to exclude `uibook`:

```js
new HtmlWebpackPlugin({
  excludeChunks: ['uibook']
})
```

---

[← Back to the main page](../README.md)
**[Next: Configuration →](configure.md)**