var React = require('react')
var h = React.createElement

var stringify = require('../lib/stringify.js')
// var UibookHighlight = require('./highlight')

var Case = function (props) {
  return h('section', { className: 'uibook-case' }, props.children)
}

var UibookCase = function (props) {
  var example = props.example
  var children = props.children
  var component = props.component
  var componentProps = props.props || {}
  var name = props.name
  var text = props.text

  if (typeof example === 'undefined' && name) {
    example = 'h(' + name
    if (componentProps) example += ', ' + stringify(componentProps)
    if (text) example += ', [' + stringify(text) + ']'
    example += ')'
  }
  componentProps.key = name
  if (!children && component) {
    children = h(component, componentProps, [text])
  }

  return h(Case, null, [
    example
      ? h('code', {
        className: 'uibook-code',
        key: 'example'
      }, example)
      : null,
    h('div', {
      suppressContentEditableWarning: true,
      contentEditable: props.isEditable,
      key: 'content'
    }, children)
  ])
}

UibookCase.event = function (name) {
  return function () {
    var args = Array.prototype.slice.call(arguments)
    var event = new CustomEvent('track', {
      detail: {
        name: name,
        args: args
      }
    })
    if (window.parent) {
      window.parent.document.body.dispatchEvent(event)
    } else {
      document.body.dispatchEvent(event)
    }
  }
}

module.exports = UibookCase
