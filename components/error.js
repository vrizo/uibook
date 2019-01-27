var React = require('react')
var h = React.createElement

var UibookButton = require('./button')

var UibookError = function (props) {
  return h('div', { className: 'uibook-error' }, [
    h('div', { className: 'uibook-error__icon', key: 'icon' }, '🙁'),
    h('div', { className: 'uibook-error__desc', key: 'desc' }, props.desc),
    h(UibookButton, {
      href: props.actionUrl,
      key: 'action'
    }, props.actionText)
  ])
}

module.exports = UibookError
