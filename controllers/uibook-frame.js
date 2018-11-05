var createReactClass = require('create-react-class')
var React = require('react')
var h = React.createElement

var UibookFrameController = createReactClass({
  pages: [],

  getPage: function (name) {
    var pages = this.props.pages
    if (pages[name]) return pages[name]
    for (var key in pages) {
      if (pages[key].name) continue
      if (pages[key][name]) return pages[key][name]
    }
    return { }
  },

  params: function () {
    var result = { }
    location.search.slice(1).split('&').forEach(function (i) {
      var name = i.split('=')[0]
      var value = i.split('=')[1]
      result[name] = decodeURI(value)
    })
    return result
  },

  render: function () {
    var params = this.params()
    return h('main', null, [
      this.getPage(params.page).cases[params.case].body(params.locale)
    ])
  }
})

module.exports = UibookFrameController
