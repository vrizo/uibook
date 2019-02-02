var createReactClass = require('create-react-class')
var React = require('react')
var h = React.createElement

var fixClick = require('../lib/fix-click')

var UibookCheckbox = createReactClass({
  spaceToggle: function (e) {
    if (e.keyCode === 32 && this.props.onChange) {
      e.preventDefault()
      this.props.onChange(e)
    }
  },

  change: function (e) {
    if (this.props.onChange) this.props.onChange(e)
    fixClick(e)
  },

  render: function () {
    var atts = {
      className: 'uibook-checkbox',
      disabled: !!this.props.disabled,
      onChange: this.change,
      tabIndex: -1,
      checked: !!this.props.checked,
      type: 'checkbox',
      key: 'input'
    }

    return h('label', {
      className: 'uibook-checkbox__wrapper',
      onKeyDown: this.spaceToggle,
      tabIndex: 0
    }, [
      h('input', atts),
      h('div', { className: 'uibook-checkbox__fake', key: 'fake' },
        h('div', { className: 'uibook-checkbox__crop' },
          h('svg', null,
            h('path', {
              d: 'M4.21 6.95L3 8.163l3.76 3.761 6.208-6.207L11.75 4.5l-4.99 5z'
            })
          )
        )
      ),
      this.props.children
    ])
  }
})

module.exports = UibookCheckbox
