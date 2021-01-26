# Install in create-react-app using [CRACO](https://github.com/gsoft-inc/craco) :hatching_chick:

Step 1. Install the package using your favorite package manager

```bash
$ yarn add uibook
```

Step 2. Add Uibook in `craco.config.js`

_craco.config.js_
```js
let isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  webpack: {
    configure: {
      output: {
        filename: isProduction
            ? 'static/js/[name].[contenthash:8].js'
            : 'static/js/[name].js',
      },
    },
    plugins: [
      new UibookPlugin({
        // JSX is transformed only in `src/` folder
        controller: path.join(__dirname, 'src/uibook/uibook-controller.js'),
        isFixedHeader: true,
        outputPath: '/uibook',
        title: 'Uibook',
        hot: true
      }),
    ],
  },
};
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

Nice work! You’ve installed Uibook in Create React App just now.
Now we can [configure it](configure.md).

_Thanks to :octocat: [@Grawl](https://github.com/Grawl) for help with this section._

---

[← Back to the main page](../README.md)

**[Next: Configuration →](configure.md)**
