# Troubleshooting 

## No Pages

You should describe each test component. 
Please read [about configuring](configure.md).

## No Cases

You forget to pass Cases to your Page.
Read more about Cases [here](configure.md#cases).

## Iframe Error

Uibook renders Responsive Cases in a `<iframe>`. 
There few possible reasons of Iframe error:

1. The Component fails to render. We recommend using Chrome to debug, 
because Firefox doesn’t show warnings and errors for iframes in console;
2. Custom props don’t fit URL. Uibook uses URL to pass props to iframe and 
your props might be too long. Also, we recommend to use strings only;
3. Component expects integers but receives string. Props passed via URL are 
stringified, and we’re going to fix this issue later.

## Exclude Chunk Warning

If you’re using HtmlWebpackPlugin, it’s necessary to exclude `uibook`:

_webpack.config.js_
```js
new HtmlWebpackPlugin({
  excludeChunks: ['uibook']
})
```

---

[← Back to the Controller](controller.md)

**[Next: Examples →](examples.md)**
