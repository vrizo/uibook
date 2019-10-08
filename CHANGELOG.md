# Change Log
This project adheres to [Semantic Versioning](http://semver.org/).

## 0.5.8
* Added support of Cyrillic component names
* Fixed converting of CamelCase to space separated words in Page Selector
* Fixed unchangable Select

## 0.5.7
* Added "Go to Top" button
* Sticky header by default
* `white` background is deprecated. Please use `light` instead
* Fixed support of entrypoints as objects
  (@helsi-pro https://github.com/vrizo/uibook/pull/9)

## 0.5.6
* Fixed HMR module loading if it is disabled in `devServer`

## 0.5.5
* Added Hot Reload feature
* Update dependencies
* Added pre-commit tests
* Use the first locale if it is absent in URL hash

## 0.5.4
* Update dependencies
* Fixed entrypoints iteration if `compilation.entrypoints` is object

## 0.5.3
* Updated dependencies to resolve security vulnerabilities
* Fixed entrypoints iteration

## 0.5.2
* Fixed files importing in HTML
* Added white page troubleshooting in Create React App

## 0.5.1
* Fixed events toast z-index
* Fixed HtmlWebpackPlugin detector
* Fixed strinfying of ReactComponents/ReactElements
* Added delay before scrollTo() after Page switching
* Fixed blur() after click by mouse on Checkbox and Select

## 0.5
* Initial release.
