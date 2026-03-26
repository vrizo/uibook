
<div align="right">
  <details>
    <summary >🌐 Language</summary>
    <div>
      <div align="center">
        <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=en">English</a>
        | <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=zh-CN">简体中文</a>
        | <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=zh-TW">繁體中文</a>
        | <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=ja">日本語</a>
        | <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=ko">한국어</a>
        | <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=hi">हिन्दी</a>
        | <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=th">ไทย</a>
        | <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=fr">Français</a>
        | <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=de">Deutsch</a>
        | <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=es">Español</a>
        | <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=it">Italiano</a>
        | <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=ru">Русский</a>
        | <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=pt">Português</a>
        | <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=nl">Nederlands</a>
        | <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=pl">Polski</a>
        | <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=ar">العربية</a>
        | <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=fa">فارسی</a>
        | <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=tr">Türkçe</a>
        | <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=vi">Tiếng Việt</a>
        | <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=id">Bahasa Indonesia</a>
        | <a href="https://openaitx.github.io/view.html?user=vrizo&project=uibook&lang=as">অসমীয়া</
      </div>
    </div>
  </details>
</div>


<a href="https://www.facebook.com/amplifr/">
  <img width="80" height="80" align="right"
    alt="Sponsored by Amplifr" src="./amplifr-logo.png" style="border-radius: 100%; margin: 10px;"/>
</a>


# Uibook

Uibook is a tool for visual testing of React components. It let you quickly
check both desktop and mobile view of your components with real media queries
and different combinations of props.

The Key Features:
- Responsive Testing for developers to play with **real media queries**
- Live Text Editing for designers and editors to check their content
- Installed as a Webpack Plugin, it doesn’t require any additional builder.

<img src="/docs/uibook.gif" align="center" alt="Uibook key features" >

:triangular_flag_on_post: Check the Uibook demo project here:
[https://uibook.vrizo.net/](https://uibook.vrizo.net/#Presets:ru).

## Usage

### Quick Install :hatching_chick:

We’ve designed Uibook for seamless integration to your project.
Install it as a webpack plugin, and you’re all set:
Uibook doesn’t require any separate bundler.

_webpack.config.js_
```js
const UibookPlugin = require('uibook/plugin')

module.exports = {
  …
  plugins: [
    new UibookPlugin({
      outputPath: '/uibook',
      controller: path.join(__dirname, '../src/uibook-controller.js'),
      hot: true
    })
  ],
}
```

[Read more about installation →](docs/install.md)
[Install in Create React App using CRACO →](docs/install_craco.md)

### Describe components in Pages :hatched_chick:

You should define two things only:

1. The Page — simple object with test component name and cases;
2. The Case — set of props and callbacks to the component.

_button.uibook.js_
```js
import UibookCase from 'uibook/case'
import Button from '../src/button'

export default {
  component: Button,
  cases: [
    () => <UibookCase>Button</UibookCase>,
    () => <UibookCase props={{ isSmall: true }}>Small button</UibookCase>
  ]
}
```

[Read more about configuration →](docs/configure.md)

### Pass Pages to the Controller :baby_chick:

As soon as you finished your first Uibook Page, you’re ready
to write Uibook Controller. This is a place where all
Pages included and passed to UibookStarter :sparkles:

_uibook-controller.js_
```js
import UibookStarter from 'uibook/starter'
import ButtonUibook from './button.uibook'

export default UibookStarter({
  pages: {
    Button: ButtonUibook
  }
})
```

[Read more about Controller →](docs/controller.md)

### Launch :rocket:

There is no need in any additional servers or webpack instances.
Uibook integrates into your project, so just run your bundler
and open `/uibook` (or your custom address — `outputPath`) in a browser.

### More information

- **[Troubleshooting](docs/troubleshooting.md)**
- [Examples](docs/examples.md)
- [Ask me](https://twitter.com/vitaliirizo)

## Live Text Editing

This mode enables `contentEditable` for each case, allowing managers,
designers and interface editors to preview content in components.

<img src="/docs/text-edit-mode.gif" align="center" alt="Text Edit Mode" >

## Special thanks

- [@ai](https://github.com/ai)
- [@demiazz](https://github.com/demiazz)
- [@marfitsin](https://github.com/marfitsin)
- [@iadramelk](https://github.com/iadramelk)
- [@ikowalsker](https://www.facebook.com/ikowalsker)
- [@antiflasher](https://github.com/antiflasher)
- [@HellSquirrel](https://github.com/HellSquirrel)

Anyone is welcomed to contribute, you can check current tasks
in [PLAN.md](PLAN.md). I would be glad to answer your questions
about the project.
