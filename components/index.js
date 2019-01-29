var React = require('react')
var h = React.createElement

var UibookHeader = require('./header')
var UibookEvents = require('./events')

var THEMES = {
  default: '#f2f2f2',
  white: '#fff',
  dark: '#ddd'
}

var Page = function (props) {
  return h('div', {
    className: 'uibook-page',
    style: { background: THEMES[props.background] }
  }, props.children)
}

var Uibook = function (props) {
  var atts = {
    className: 'uibook-container',
    key: 'body'
  }

  if (props.isEditable) atts.className += ' uibook-container__editable'

  return h(Page, { background: props.background }, [
    h('div', { className: 'uibook-top', key: 'top' },
      h(UibookEvents, { events: props.events })
    ),
    h(UibookHeader, {
      onEditableSwitch: props.onEditableSwitch,
      onValueChange: props.onValueChange,
      onPageChange: props.onPageChange,
      isEditable: props.isEditable,
      onNextPage: props.onNextPage,
      onPrevPage: props.onPrevPage,
      values: props.values,
      pages: props.pages,
      state: props.state,
      page: props.page,
      key: 'header'
    }),
    h('main', atts, props.children)
  ])
}

module.exports = Uibook
