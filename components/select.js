var createReactClass = require('create-react-class')
var React = require('react')
var h = React.createElement

var UibookPageSelect = createReactClass({
  change: function (e) {
    this.props.onPageChange(e.target.value)
    e.target.blur()
  },

  optionFromPage: function (page) {
    var re = /($[a-z])|[A-Z][^A-Z]+/g
    var preparedName = page.name.match(re).join(' ')
    return h('option', { key: page.name, value: page.name }, preparedName)
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

    return h('select', {
      className: 'uibook-select uibook-page-select',
      onChange: this.change,
      style: { background: this.props.color },
      value: this.props.page || ''
    }, selectChildren)
  }
})

module.exports = UibookPageSelect
