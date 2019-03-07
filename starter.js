var ReactDOM = require('react-dom')
var React = require('react')
var h = React.createElement

var UibookFrameController = require('./controllers/frame')
var UibookController = require('./controllers/index')

var UibookStarter = function (config) {
  window.onload = function () {
    var tag = document.getElementById('uibook-root')
    var Controller = UibookController

    if (/&iframe=true/.test(location.href)) {
      Controller = UibookFrameController
    }

    ReactDOM.render(h(Controller, {
      wrapper: config.wrapper,
      values: config.values,
      pages: config.pages
    }), tag)
  }
}

module.exports = UibookStarter
