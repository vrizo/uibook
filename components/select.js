var React = require('react')
var h = React.createElement

var Wrapper = function (props) {
  var className = 'uibook-select__wrapper'
  if (props.disabled) className += ' is-disabled'

  return h('div', { className: className }, props.children)
}

var Label = function (props) {
  return h('label', {
    className: 'uibook-select__label',
    htmlFor: props.htmlFor
  }, props.children)
}

var UibookSelect = function (props) {
  return h(Wrapper, { disabled: props.disabled }, [
    h('select', {
      className: 'uibook-select',
      disabled: props.disabled,
      onChange: props.onChange,
      value: props.value,
      key: props.id,
      id: props.id
    }, props.children),
    h(Label, { htmlFor: props.id, key: 'label' + props.id }, props.value)
  ])
}

module.exports = UibookSelect
