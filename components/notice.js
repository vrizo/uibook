var React = require('react')
var h = React.createElement

var DOCS_URL = 'https://github.com/vrizo/uibook/blob/master/docs/'

var t = {
  hotUrl: 'troubleshooting.md#hot-reload-warning',
  hotText: 'Failed to activate hot reload',
  hotAction: 'Read more',
  chunkUrl: 'troubleshooting.md#exclude-chunk-warning',
  chunkText: 'Exclude Uibook chunk from HtmlWebpackPlugin',
  chunkAction: 'Read how'
}

var Uibook = function (props) {
  var type = props.type

  return h('a', {
    className: 'uibook-notice',
    href: DOCS_URL + t[type + 'Url']
  }, [
    h('div', {
      className: 'uibook-notice__text',
      key: 'message'
    }, t[type + 'Text']),
    h('div', {
      className: 'uibook-notice__action',
      key: 'link'
    }, t[type + 'Action'])
  ])
}

module.exports = Uibook
