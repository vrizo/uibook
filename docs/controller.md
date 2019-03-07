
# Basic Controller :baby_chick:

Once you finished your first [Uibook Page](configure.md), you’re ready 
to write Uibook Controller. This is a place where all 
Pages included and passed to UibookStarter :sparkles:

Let’s start with a Basic Controller. You can add Redux, Context, etc 
later in [Advanced Controller](#advanced-controller) section.

1. Create `uibook-controller.js` file in `uibook/` folder
2. Import `UibookStarter` and all your Pages
3. Then export `UibookStarter` with the following arguments

_uibook-controller.js_
```js
import UibookStarter from 'uibook/starter'

import CheckboxUibook from './checkbox.uibook'
import ButtonUibook from './button.uibook'
import PopupUibook from './popup.uibook'

export default UibookStarter({
  pages: {
    Button: ButtonUibook,
    Checkbox: CheckboxUibook,
    Popup: PopupUibook
  }
})
```

:triangular_flag_on_post: You can use Pages nesting:

<img src="/docs/nesting.png" align="center" width="456" height="302" alt="Nesting in Pages" >

_uibook-controller.js_
```js
  pages: {
    Button: ButtonUibook,
    Checkbox: CheckboxUibook,
    Popups: {
      Popup: PopupUibook
    }
  }
```

Amazing! You’ve finished your Basic Controller, and now **you can start 
Uibook with your project**.

Uibook integrates into your project, so just run your bundler 
and open `/uibook` (or your custom address) in a browser.

# Advanced Controller

This section describes how to add Wrappers, for example, Redux, Context, etc 
with **your switchable values**.

<img src="/docs/advanced-controller.gif" align="center" alt="Advanced Controller" >

For example, wrap the component with a new React Context API and 
pass custom values: `locale` and `theme`. Uibook shows custom selectors 
in the top bar.

```js
…
import Context from './Context'

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
    Button: ButtonUibook,
    Checkbox: CheckboxUibook,
    Popup: PopupUibook
  }
})
```

:triangular_flag_on_post: `locale` is the only prop shown in URL. 
Also, it is passed to Case function:

_button.uibook.js_
```
  cases: [
    locale => <UibookCase>locale === 'de' ? 'Hund' : 'Dog'</UibookCase>,
  ]
```

---

[← Back to the configuration guide](configure.md)

**[Next: Troubleshooting →](troubleshooting.md)**