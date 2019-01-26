var React = require('react')
var h = React.createElement

var Wrapper = function (props) {
  return h('div', { className: 'uibook-select__wrapper' }, props.children)
}

var Label = function (props) {
  return h('label', {
    className: 'uibook-select__label',
    htmlFor: props.htmlFor
  }, props.children)
}

var UibookSelect = function (props) {
  return h(Wrapper, null, [
    h('select', {
      className: 'uibook-select',
      onChange: props.onChange,
      value: props.value,
      key: props.id,
      id: props.id
    }, props.children),
    h(Label, { htmlFor: props.id, key: 'label' + props.id }, props.value)
  ])
}

module.exports = UibookSelect
