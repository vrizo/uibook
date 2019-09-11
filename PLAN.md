# TODO

- add docs how to add to Create React App
- fix synthetic reuse error
- stylize code examples
- create a landing page with pros, docs and videos
- stringify JSX mode (create examples in JSX style, not a hyperscript)
- generate correct examples for Immutable in lib/stringify
- add tests
- write a hack for `create-react-app`, because it doesn’t allow to modify
webpack config without ejection
- add PropTypes
- add complex example in docs like `desktop-popups.uibook.js` in Amplifr
- custom props are stringified in iframe (integer becomes string).
Pass prop type to iframe?

### Archive

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
+ return '/uibook/?page=' + page + '&case=' + index + '&locale=' + locale
+ '&iframe=true'
сюда подставлять пользовательский адрес
+ создать репозиторий
+ Object.assign не поддерживается в IE, заменить на combineObjects()
+ конфигурируемый output path (с фильтрацией слэшей)
+ добавить индикацию загрузки iframe
+ добавить возможность добавлять свой стор, провайдер и т.п. (Wrapper)
+ добавить возможность переключать пользовательские параметры в контексте
+ проброс текущей локали в контекст
+ больше локалей из конфига (ru/en)
+ дизайн верхней полоски
+ no pages view
+ no cases view
+ режим редактирования текста
+ добавить проверку, удалось ли найти main в iframe. Если нет,
то рендерить ошибку
+ избавиться от пропа text, переделать на ребенка
+ переделать мобильные кейсы, чтоб всё в едином стиле было
+ проверить случай, когда компонент — функция, но нет локали
(var component = i(this.state.locale))
+ написать документацию
+ отключать горячие клавиши, когда включен режим редактирования текста
+ обработка случая мобильного вида без `body` (обрабатывается ошибкой айфрема)
+ добавить сообщение, что нужно сделать excludeChunks
+ зафиксировать ширину PageSelect
+ перенести Амплифер на плагин, проверить в ИЕ
+ исправить stringify of null
+ проверить, что еще случайно из ES6 (легко — yarn build)
+ предотвращать проскролливание до autofocus инпутов при смене страниц
+ еще подумать над page: null при загрузке
+ заменять `\n` на `<br>` в example
+ Node.js script to create structure
+ разместить ссылки на документацию в ошибках
+ add lint-staged
