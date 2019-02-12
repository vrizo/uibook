var createReactClass = require('create-react-class')
var React = require('react')
var h = React.createElement

var combineObjects = require('../lib/combine-objects')
var UibookWrapper = require('../controllers/wrapper')
var UibookCase = require('../components/case')

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
    var currCase = page.cases[atts.case]
    if (typeof currCase.body !== 'function') {
      return null
    }

    var component = currCase.body(atts.locale)

    var combinedProps = combineObjects(
      { component: page.component, name: page.name }, component.props
    )
    if (component.type === UibookCase) {
      combinedProps = combineObjects({ isFrame: true }, combinedProps)
    }
    var children = component.children || component.props.children
    var content = h(component.type, combinedProps, children)

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
