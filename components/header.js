var React = require('react')
var h = React.createElement

var UibookPageSelect = require('./page-select')
var UibookCheckbox = require('./checkbox')
var UibookSelect = require('./select')
var UibookButton = require('./button')

var THEMES = {
  default: '#e6e6e6',
  white: '#f2f2f2',
  light: '#f2f2f2',
  dark: '#d2d2d2'
}

var t = {
  textEdit: 'Text Edit'
}

var Header = function (props) {
  var atts = {
    className: 'uibook-header',
    style: { background: THEMES[props.background] }
  }

  if (props.isFixed) atts.className += ' is-fixed'

  return h('header', atts, props.children)
}

var UibookHeader = function (props) {
  var selectors = []

  if (props.values) {
    for (var key in props.values) {
      if (props.values[key]) {
        selectors.push({
          key: key,
          values: props.values[key]
        })
      }
    }
  }

  return h(Header, {
    background: props.background,
    isFixed: props.isFixed,
    key: 'header'
  }, [
    h('nav', { className: 'uibook-nav', key: 'nav' }, [
      h(UibookButton, {
        isSecondary: true,
        disabled: !props.page || props.isEditable,
        onClick: props.onPrevPage,
        key: '←'
      }, '←'),
      h(UibookPageSelect, {
        onPageChange: props.onPageChange,
        disabled: props.isEditable,
        pages: props.pages,
        page: props.page,
        key: 'select'
      }),
      h(UibookButton, {
        isSecondary: true,
        disabled: !props.page || props.isEditable,
        onClick: props.onNextPage,
        key: '→'
      }, '→')
    ]),
    selectors.length > 0
      ? selectors.map(function (selector) {
        return h(UibookSelect, {
          onChange: props.onValueChange,
          value: props.state[selector.key],
          key: selector.key,
          id: selector.key
        }, selector.values.map(function (value) {
          return h('option', {
            value: value,
            key: selector.key + value
          }, value)
        }))
      })
      : null,
    h('div', { className: 'uibook-spacer', key: 'spacer' }),
    h('div', { className: 'uibook-editable', key: 'edit' },
      h(UibookCheckbox, {
        onChange: props.onEditableSwitch,
        checked: props.isEditable
      }, t.textEdit)
    )
  ])
}

module.exports = UibookHeader
