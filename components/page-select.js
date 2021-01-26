var createReactClass = require('create-react-class')
var React = require('react')
var h = React.createElement

var UibookSelect = require('./select')

var t = {
  noPages: 'No pages'
}

var unprepareName = function (name) {
  return name.replace(/ /g, '')
}

var prepareName = function (name) {
  return name.replace(/([a-zа-яёђѓєѕіїјљњћќўџґ])([A-ZЁЂЃЄЅІЇЈЉЊЋЌЎЏА-ЯҐ])/g,
    '$1 $2')
}

var UibookPageSelect = createReactClass({
  change: function (e) {
    var name = unprepareName(e.target.value)

    this.props.onPageChange(name)
    e.target.blur()
  },

  optionFromPage: function (page) {
    var preparedName = prepareName(page.name)

    return h('option', { key: page.name, value: preparedName }, preparedName)
  },

  render: function () {
    var selectChildren = Object.keys(this.props.pages).map(function (i) {
      if (this.props.pages[i].name) {
        return this.optionFromPage(this.props.pages[i])
      }

      return h('optgroup', {
        label: i,
        key: i
      }, [
        Object.keys(this.props.pages[i]).map(function (j) {
          return this.optionFromPage(this.props.pages[i][j])
        }.bind(this))
      ])
    }.bind(this))

    return h(UibookSelect, {
      disabled: selectChildren.length === 0 || this.props.disabled,
      onChange: this.change,
      isAccent: true,
      value: prepareName(this.props.page || t.noPages),
      id: 'uibook-page-select'
    }, selectChildren)
  }
})

module.exports = UibookPageSelect
