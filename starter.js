var ReactDOM = require('react-dom')
var React = require('react')
var h = React.createElement

var UibookFrameController = require('./controllers/frame')
var UibookController = require('./controllers/index')
var combineObjects = require('./lib/combine-objects')

var DOCS_URL = 'https://github.com/vrizo/uibook/blob/master/'

var t = {
  nameDeprecated: function (name) {
    return 'Key \'name\' is deprecated. You can remove it in ' + name +
           '. Details: ' + DOCS_URL + 'CHANGELOG.md#060'
  }
}

var injectName = function (pages) {
  var output = pages
  for (var name in pages) {
    var page = pages[name]
    if (page.cases) {
      if (page.name) {
        console.warn(t.nameDeprecated(page.name)) /* eslint-disable-line */
      }
      output[name] = combineObjects(page, { name: name })
    } else {
      output[name] = injectName(pages[name])
    }
  }

  return output
}

var UibookStarter = function (config) {
  window.onload = function () {
    var Controller = UibookController
    var pages = injectName(config.pages)
    var tag = document.getElementById('uibook-root')

    if (/&iframe=true/.test(location.href)) {
      Controller = UibookFrameController
    }

    ReactDOM.render(h(Controller, {
      wrapper: config.wrapper,
      values: config.values,
      pages: pages
    }), tag)
  }
}

module.exports = UibookStarter
