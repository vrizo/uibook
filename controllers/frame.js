var createReactClass = require('create-react-class')
var React = require('react')
var h = React.createElement

var combineObjects = require('../lib/combine-objects')
var UibookWrapper = require('../controllers/wrapper')

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

  atts: function () {
    var result = { }

    location.search.slice(1).split('&').forEach(function (i) {
      var name = i.split('=')[0]
      var value = i.split('=')[1]
      result[name] = decodeURI(value)
    })
    return result
  },

  render: function () {
    var atts = this.atts()
    var page = this.getPage(atts.page)
    var component = this.getPage(atts.page).cases[atts.case].body(atts.locale)

    var combinedProps = combineObjects(
      {
        component: page.component,
        isFrame: true,
        name: page.name
      }, component.props
    )
    var content = h(component.type, combinedProps, component.children)

    return h(UibookWrapper, {
      wrapper: this.props.wrapper,
      values: this.props.values,
      state: atts
    }, h('main', {
      suppressContentEditableWarning: true,
      contentEditable: atts.editable,
      className: 'uibook-content'
    }, content))
  }
})

module.exports = UibookFrameController
