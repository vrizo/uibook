var React = require('react')
var h = React.createElement

var Wrapper = function (props) {
  var className = 'uibook-select__wrapper'
  if (props.isAccent) className += ' is-accent'
  if (props.disabled) className += ' is-disabled'

  return h('div', { className: className }, props.children)
}

var Label = function (props) {
  var className = 'uibook-select__label'
  if (props.isAccent) className += ' is-accent'

  return h('label', {
    className: className,
    htmlFor: props.htmlFor
  }, props.children)
}

var UibookSelect = function (props) {
  var change = function (event) {
    if (props.onChange) props.onChange(event)
    event.currentTarget.blur()
  }

  var atts = {
    className: 'uibook-select',
    disabled: props.disabled,
    onChange: change,
    value: props.value,
    key: props.id,
    id: props.id
  }

  return h(Wrapper, { isAccent: props.isAccent, disabled: props.disabled }, [
    h('select', atts, props.children),
    h(Label, {
      isAccent: props.isAccent,
      htmlFor: props.id,
      key: 'label' + props.id
    }, props.value)
  ])
}

module.exports = UibookSelect
