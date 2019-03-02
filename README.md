
<a href="https://amplifr.com/?utm_source=uibook">
  <img width="100" height="140" align="right"
    alt="Sponsored by Amplifr" src="https://amplifr-direct.s3-eu-west-1.amazonaws.com/social_images/image/37b580d9-3668-4005-8d5a-137de3a3e77c.png" />
</a>


# Uibook

Uibook is a tool for visual testing of React components. With it, you can easily check desktop and mobile view of your components with different props combinations.

1) Installed as a Webpack Plugin
2) Responsive Testing
3) Live Text Editing

<img src="/docs/uibook.png" align="center" alt="Uibook" >

Uibook example is accessible by [https://amplifr.com/uikit](https://amplifr.com/uikit).

## Quick Install :hatching_chick:

Uibook has been designed for seamless integration to your project. Install it as a webpack plugin and you’re all set: Uibook doesn’t require separate bundler.

_webpack.config.js_
```js
const Uibook = require('uibook')

module.exports = {
  …
  plugins: [
    new Uibook({
      outputPath: '/uibook',
      controller: path.join(__dirname, '../src/uibook-controller.js')
    })
  ],
}
```

[Read more about installation →](docs/install.md)

## Describe components in Pages :hatched_chick:

You will need two things only:

1. The Page — simple object with test component name and cases.
2. The Case — set of props and callbacks to the component.

_button.uibook.js_
```js
import UibookCase from 'uibook-plugin/button/case'
import Button from '../src/button'

export default {
  component: Button,
  name: 'Button',
  cases: [
    () => <UibookCase>Button</UibookCase>,
    () => <UibookCase props={{ isSmall: true }}>Small button</UibookCase>
  ]
}
```

[Read more about configuration →](docs/configure.md)

## Pass Pages to the Controller :baby_chick:

Once you finished your first Uibook Page, you're ready 
to write Uibook Controller. This is a place where all 
Pages included and passed to UibookStarter :sparkles:

_uibook-controller.js_
```js
import UibookStarter from 'uibook-plugin/uibook'
import ButtonUibook from './button.uibook'

export default UibookStarter({
  pages: {
    Button: ButtonUibook
  }
})
```

[Read more about Controller →](docs/controller.md)

## Launch :rocket:

There is no need to start any additional servers or webpack instances.
It is fully integrated to your project, so just run your bundler 
and open `/uibook` (or your custom address — `outputPath`) in your browser.

## Live Text Editing
This mode enabled `contentEditable` for each case, allowing interface 
editors to preview texts in components.

<img src="/docs/text-edit-mode.gif" align="center" width="480" height="264" alt="Text Edit Mode" >

## Special thanks

- [@ai](https://github.com/ai)
- [@demiazz](https://github.com/demiazz)
- [@marfitsin](https://github.com/marfitsin)
- [@iadramelk](https://github.com/iadramelk)
- [@antiflasher](https://github.com/antiflasher)
- [@HellSquirrel](https://github.com/HellSquirrel)


