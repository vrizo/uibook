var createReactClass = require('create-react-class')
var React = require('react')
var h = React.createElement

var fixClick = require('../lib/fix-click')

var UibookButton = createReactClass({
  click: function (e) {
    if (this.props.onClick) this.props.onClick(e)
    fixClick(e)
  },

  render: function () {
    var atts = {
      className: 'uibook-button',
      disabled: !!this.props.disabled,
      onClick: this.click
    }

    if (this.props.isSecondary) atts.className += ' is-secondary'
    if (this.props.href) atts.href = this.props.href

    return h(this.props.href ? 'a' : 'button', atts, this.props.children)
  }
})

module.exports = UibookButton
