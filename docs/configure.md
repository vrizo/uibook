# Configure :hatched_chick:

- [Pages](#pages)
- [Cases](#cases)
- [Responsive Cases](#responsive-cases)

## Pages

You should describe each test component. One component — one page.

First of all, let’s create a Page.
It’s easier to follow the following file structure:

```
your-project
├── uibook
│   ├── button.uibook.js
│   ├── field.uibook.js
│   └── uibook-controller.js
├── src
│   ├── button.js
│   └── field.js
├── webpack.config.js
└── package.json
```

:triangular_flag_on_post: Tip: run `$ npm init uibook`
to create example Uibook files.

1. Create a new js file in `uibook/` folder naming it as a test component
2. Open the file you just created, import `UibookCase` and your Component
3. Then return an object like in an example below

_button.uibook.js_
```js
import UibookCase from 'uibook/case'
import Button from '../src/button'

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

## Cases

A case is a single set of props passed to the Component.

Each case is a function returning `UibookCase` with the following parameters:

_button.uibook.js_
```js
export default {
  component: Button,
  name: 'Button',
  cases: [
    () => <UibookCase props={{ href: '#' }}>Button</UibookCase>,
    () => <UibookCase props={{ isSmall: true, href: '#' }}>
      Small Button
    </UibookCase>
  ]
}
```

where:
- `example` _(optional)_ — code example or your comments, it will be rendered
before Test Component.
- `props` — set of necessary props
– `text` — string child of the Component

:triangular_flag_on_post: There is an optional argument `locale` if you’re
using custom parameters. Please refer to
[Advanced Controller](controller.md#advanced-controller).

## Responsive Cases

Uibook render Responsive Cases in an iframe to use real media queries.

You can add Responsive Case by wrapping a Case with
an object with width, height or both values

_button.uibook.js_
```js
  cases: [
    () => <UibookCase props={{ … }}>Button</UibookCase>,
    {
      width: 320,
      body: () => <UibookCase props={{ … }}>Mobile Button</UibookCase>
    }
  ]
```

## Events testing

<img src="/docs/events.png" align="center" alt="Events bubble" >

You can pass fake events to test callbacks:

_button.uibook.js_
```js
  cases: [
    () => <UibookCase props={{
      onClick: UibookCase.event('onClick')
    }}>Clickable Button</UibookCase>,
  ]
```

Congratulations! You’ve finished the most challenging part.
It’s time to pass your first Page to the [Controller](controller.md).

---

[← Back to the installation guide](install.md)

**[Next: Controller →](controller.md)**
