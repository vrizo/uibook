var createReactClass = require('create-react-class')
var React = require('react')
var h = React.createElement

var stringify = require('../lib/stringify.js')

var UibookEvents = createReactClass({
  format: function (args) {
    return args.map(function (i) {
      if (typeof i.isPropagationStopped !== 'undefined') {
        return 'Event'
      } else {
        return stringify(i)
      }
    }).join(', ')
  },

  render: function () {
    return h('div', { className: 'uibook-event__position' }, [
      this.props.events.map(function (i) {
        return h('div', { className: 'uibook-event', key: i.id }, [
          h('strong', {
            className: 'uibook-event__name',
            key: 'name'
          }, [i.name + ': ']),
          this.format(i.args)
        ])
      }.bind(this))
    ])
  }
})

module.exports = UibookEvents
