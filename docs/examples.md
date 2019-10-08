# Examples

## Simple Example with New Context API

```
react-app
├── uibook
│   ├── checkbox.uibook.js
│   ├── button.uibook.js
│   ├── field.uibook.js
│   └── uibook-controller.js
├── controllers
│   └── context.js
├── src
│   ├── checkbox.js
│   ├── button.js
│   └── field.js
├── webpack.config.js
└── package.json
```

_webpack.config.js_
```js
const Uibook = require('uibook')
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      excludeChunks: ['uibook'],
      template: paths.appHtml,
    }),
    new Uibook({
      outputPath: '/uikitties',
      controller: path.join(__dirname, '../src/uibook-controller.js'),
      title: 'Uikitties'
    }),
  ],
```

_uibook-controller.js_
```js
import UibookStarter from 'uibook/uibook'
import Context from '../controllers/context'

import CheckboxUibook from './checkbox.uibook'
import ButtonUibook from './button.uibook'
import FieldUibook from './field.uibook'
import PopupUibook from './popup.uibook'

export default UibookStarter({
  wrapper: (children, props) =>
    <Context.Provider value={ props }>
      { children }
    </Context.Provider>,
  values: {
    locale: ['ru', 'en'],
    theme: ['dark', 'light']
  },
  pages: {
    Checkbox: CheckboxUibook,
    Button: ButtonUibook,
    Field: FieldUibook,
    Popups: {
      Popup: PopupUibook
    }
  }
})
```

_button.uibook.js_
```js
import UibookCase from 'uibook/case'

const ButtonUibook = {
  component: Button,
  cases: [
    () => <UibookCase example="Код\n и переносы" props={{ ...PROPS }}>
      First Button
    </UibookCase>,
    () => <UibookCase props={{ ...PROPS, isLarge: true }}>
      Large Button
    </UibookCase>,
    () => <UibookCase props={{ ...PROPS, isDisabled: true }}>
      Disabled
    </UibookCase>
  ]
}

export default ButtonUibook
```

_checkbox.uibook.js_
```js
var CheckboxUibook = {
  background: 'dark',
  component: Checkbox,
  cases: [
    () => <UibookCase>First</UibookCase>,
    () => <UibookCase props={{ isChecked: true }}>Checked</UibookCase>,
    () => <UibookCase props={{ isDisabled: true }}>Disabled</UibookCase>
  ]
}
```

---

[← Back to the Troubleshooting](troubleshooting.md)
