var React = require('react')
var h = React.createElement

var fixClick = require('../lib/fix-click')

var t = {
  top: 'Go to top',
  return: 'Go back'
}

var UibookGoToTop = function (props) {
  var isVisible = props.isVisible
  var isReturn = props.isReturn
  var click = function (e) {
    props.onClick()
    fixClick(e)
  }

  return h('button', {
    className: 'uibook-go-to-top uibook-button is-secondary',
    onClick: click,
    title: isReturn ? t.return : t.top,
    style: {
      transform: isReturn ? 'rotate(180deg)' : 'rotate(0)',
      display: isVisible ? 'block' : 'none'
    }
  }, '↑')
}

module.exports = UibookGoToTop
