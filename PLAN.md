Установка:

1. Создается папка `uibook`
2. Внутри нее создаются юикит тесты: `component.uibook.js`
3. Пользователь создает `uibook.config.js`, где импортирует uibook тесты и добавляет сторы, если требуется.
4. В конфиг добавляет плагин с параметрами
5. Плагин генерирует файлы в `build/uibook/`


То есть плагин рендерит встроенный контроллер, который рендерит пользовательский контроллер, а дальше тесты.

Преимущества перед storyboard и styleguidist:
1. у них нет media выражений
2. они требуют запуск отдельного сервера
3. они огромные!

Юибук должен быть супер простым, одной строкой и в проде.

======

Локально обновить зависимость:

```
$ yarn upgrade uibook-plugin
```

или

```
$ cd .. && rm -drf my-app/node_modules/uibook-plugin && cp -R uibook-plugin my-app/node_modules/uibook-plugin && cd my-app && yarn start
```

```
cd .. && rm -drf amplifr-front/node_modules/uibook-plugin && cp -R ../Opensource/uikit/uibook-plugin amplifr-front/node_modules/uibook-plugin && cd amplifr-front && yarn start
```

======
15.09:

```
Failed to compile.

chunk uibook [entry]
static/js/bundle.js
Conflict: Multiple assets emit to the same filename static/js/bundle.js
```

=> filename: 'static/js/[name].[chunkhash:8].js',

===

If you're using HTML web pack plugin, then excludeChunks: ['uibook'], !!!11

## TODO

```
+ исправить null в хеше
+ открывать первую страницу при запуске
+ исправить ошибки из-за key в консоли
+ inline стили передедать на css по бэму
+ добавить hover/focus на ссылку
+ добавить fixClick
+ добавить THEMES
+ добавить UibookEvents
+ выбирать в селекте компонент из хеша
+ приделать стрелочки в Header
+ группировка в списке
+ вынести stringify() в lib
+ перенести uibook в подпапку /uibook/
+ добавить custom title страницы (в опициях `title`)
+ переименовать uikit в uibook
+ инициализировать package.json
+ прикрутить линтер
+ реализовать iframe
+ return '/uibook/?page=' + page + '&case=' + index + '&locale=' + locale + '&iframe=true'
сюда подставлять пользовательский адрес
+ создать репозиторий
+ Object.assign не поддерживается в IE, заменить на combineObjects()
+ конфигурируемый output path (с фильтрацией слэшей)
+ добавить индикацию загрузки iframe
+ добавить возможность добавлять свой стор, провайдер и т.п. (Wrapper)
+ добавить возможность переключать пользовательские параметры в контексте
wrapper: (children, props) => <Context.Provider value={props}>{ children }</Context.Provider>
values: {
  locale: ['ru', 'en'],
  theme: ['dark', 'light']
}
+ проброс текущей локали в контекст
+ больше локалей из конфига (ru/en)

- optgroup внутри optgroup? (большая вложенность кейсов в селекте)
- дизайн верхней полоски
- добавить проверку, удалось ли найти main в iframe. Если нет, то рендерить ошибку
- no pages view
- no cases view
- исправить ошибку переиспользования синтетического события
- проверить случай, когда компонент — функция, но нет локали (var component = i(this.state.locale))
- может все-таки лучше использовать привычный большинству массив вместо объекта `pages` в пользовательском контроллере?
- внедрить UibookHighlight
- еще подумать над page: null при загрузке
- проверить, что еще случайно из ES6 (легко — yarn build)
- добавить сообщение, что нужно сделать excludeChunks
- предотвращать проскролливание до autofocus инпутов при смене страниц
- stringify jsx mode (example в виде jsx, а не hyperscript)
- подумать над Immutable в stringify
- добавить тесты, lint-staged
- `create-react-app` не поддерживает плагины, не дает конфигурировать вебпак, поэтому нужны хаки (придумать способ)
- PropTypes?
- integer в iframe превращается в строку, так как передается через урл
- минимизровать вес, проверять через size-limit
```

Может быть:
- `name` переименовать в `title` — заголовок страницы
- `text` переименовать, сейчас непонятно, что это за текст
- может можно избавиться от `UibookCase` в `uibook/*.js`? Ведь в мобильной версии кейса не надо добавлять `UibookCase`, можно просто передать функцию
- `controllers/uibook` должен генерироваться сам, импортируя все файлы
из `uibook`, если это возможно
