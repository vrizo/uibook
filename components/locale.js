var createReactClass = require('create-react-class')
var React = require('react')
var h = React.createElement

var fixClick = require('../lib/fix-click')

var UibookLocale = createReactClass({
  click: function (e) {
    fixClick(e)
  },

  render: function () {
    var page = this.props.page
    var locale = this.props.locale
    return h('a', {
      className: 'uibook-link',
      onClick: this.click,
      href: '#' + page + ':' + (locale === 'ru' ? 'en' : 'ru')
    }, [
      locale === 'ru' ? '○ en   ● ru' : '● en   ○ ru'
    ])
  }
})

module.exports = UibookLocale
