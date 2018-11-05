var React = require('react')
var h = React.createElement

var Position = function (props) {
  return h('div', { className: 'uibook-loader__position' }, props.children)
}

var Loader = function (props) {
  return h('div', { className: 'uibook-loader' }, props.children)
}

var UibookLoader = function (props) {
  var isLoading = props.isLoading
  var children = props.children

  return h(Position, null, [
    h('div', {
      style: { opacity: isLoading ? 0 : 1 }
    }, [
      children
    ]),
    isLoading ? h(Loader) : null
  ])
}

module.exports = UibookLoader
