
<a href="https://amplifr.com/?utm_source=babel-plugin-transform-typograf">
  <img width="100" height="140" align="right"
    alt="Amplifr Logo" src="https://amplifr-direct.s3-eu-west-1.amazonaws.com/social_images/image/37b580d9-3668-4005-8d5a-137de3a3e77c.png" />
</a>

## Uibook
Uibook is a tool for visual testing of React (but not limited to React)
components.
Uibook example is accessable by [https://amplifr.com/uikit](https://amplifr.com/uikit).

### Install :hatching_chick:

Uibook is not released yet, but you can install it as git dependency:

```bash
$ yarn add https://github.com/vrizo/uibook
```

Do not forget to clear yarn cache before upgrading:

```bash
$ yarn cache clean && rm -R node_modules && yarn
```

### Configure :hatched_chick:

The tool works with webpack only for now.

1. Create controller file

Sorry, more details about this point coming soon.

2. Connect Uibook in your webpack configuration file

```js
let Uibook = require('uibook-plugin')
…

plugins: [
  …,
  new Uibook({
    controller: path.join(__dirname, '../src/uibookController.js'),
    outputPath: '/uibook',
    title: 'Uibook'
  })
]
```

where:

- `outputPath` _(optional)_ — directory to build Uibook files
- `controller` — path to the Uibook Controller
- `title` _(optional)_ — title of Uibook Pages in a browser

### Launch :rocket:

There is no need to start any additional servers or webpack instances.
It is fully integrated to your project, so just open `/uibook`
(or your custom address — `outputPath`) in your browser.

### Definitions

- Page — set of Cases, for example, `Popups`
- Case — single Component with a set of props and events

### Add Page

1. Create a new js file in `Uibook/` naming it as the Test Component
2. Import `UibookCase` and the Component
3. The file must return an object with the following keys

```js
export default {
  component: Button,
  name: 'Button',
  cases: [...]
}
```

where:
- `component` — pass the Test Component here
- `name` — a name of the Page
- `cases` — an array of Cases

4. Add new Page in `controllers/Uibook`

### Add Cases

Each case is an anonymous function returning `UibookCase` with
the following parameters

```js
() => h(UibookCase, {
  example: 'h(Button, { href }, [\'Link\'])',
  props: { href: '#' },
  text: 'Link'
}),
```

where:

- `example` _(optional)_ — code example, it will be rendered
before Test Component
- `props` — set of necessary props
– `text` — string child of the Component
<!-- - `i18n` _(optional)_ -->

#### Mobile Cases
Mobile Cases will be rendered in an iframe to emulate
media queries.

You can add Mobile case by wrapping a Case with the object

```js
{
  example: 'h(Button, PROPS)',
  width: 320,
  height: 320,
  body: () => h(Button, PROPS, ['Mobile'])
},
```

where:
- `example` _(optional)_ — code example, it will be rendered
before Test Component
- `width` and `height` _(optional)_ — the size of the iframe
– `text` — a name of the Case

#### Events testing
You can pass fake events to your components as props

```js
props: {
  onClick: UibookCase.event('onClick')
}
```

This will render a small popup on Uibook Page when triggered.

### Hot keys

- Arrows change pages
