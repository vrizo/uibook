var React = require('react')
var h = React.createElement

var Position = function (props) {
  return h('div', { className: 'uibook-loader__position' }, props.children)
}

var Loader = function () {
  return h('div', { className: 'uibook-loader' })
}

var UibookLoader = function (props) {
  var isLoading = props.isLoading
  var children = props.children

  return h(Position, null, [
    h('div', {
      style: { opacity: isLoading ? 0 : 1 },
      key: 'content'
    }, children),
    isLoading ? h(Loader, { key: 'loader' }) : null
  ])
}

module.exports = UibookLoader
