var React = require('react')
var h = React.createElement

var t = {
  chunkNotice: 'Exclude Uibook chunk from HtmlWebpackPlugin',
  chunkNoticeAction: 'Read how'
}

var UibookNotice = function () {
  return h('a', { className: 'uibook-notice', href: '#' }, [
    h('div', {
      className: 'uibook-notice__text',
      key: 'message'
    }, t.chunkNotice),
    h('div', {
      className: 'uibook-notice__action',
      key: 'link'
    }, t.chunkNoticeAction)
  ])
}

module.exports = UibookNotice
