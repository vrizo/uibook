
# Basic Controller

После того, как вы описали свои компоненты в Страницах и Кейсах, их нужно передать в Uibook. Для этого используется UibookStarter.

В разделе Advanced Controller описано, как добавить Обёртки, например, Redux, Context, etc и добавить свои переключатели.

1. Create `uibook-controller.js` file in `uibook/` folder
2. Import `UibookStarter` and all your Pages
3. Then export `UibookStarter` with the following arguments

```js
import UibookStarter from 'uibook-plugin/uibook'

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

Также вы можете использовать вложенность для Страниц:

<img src="/docs/structure.png" align="center" height="456" width="302" alt="Structure in Pages" >

```js
 pages: {
   Button: ButtonUibook,
   Checkbox: CheckboxUibook,
   Popups: {
     Popup: PopupUibook
   }
 }
```

# Advanced Controller

В этом разделе Advanced Controller описано, как добавить Обёртки, например, Redux, Context, etc и добавить свои переключатели.

<img src="/docs/advanced-controller.gif" align="center" height="480" width="231" alt="Advanced Controller" >

Например, передадим новый React Context API и несколько значений, который будут передаваться в Context

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
    theme: ['dark', 'light'],
    kurica: [1, 2],
  },
  pages: {
    Button: ButtonUibook,
    Checkbox: CheckboxUibook,
    Popup: PopupUibook
  }
})
```

Uibook отобразит все пользовательские переключатели в навигационном меню.

<тут ссылка на особенности использования `locale` — добавляется в URL, передается в функцию-кейс>

---

[← Back to the configuration guide](configure.md)
**[Next: Advanced usage →](advanced.md)**