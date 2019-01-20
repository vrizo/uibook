var UibookWrapper = function (props) {
  if (props.wrapper) {
    var values = {}
    for (var key in props.values) {
      values[key] = props.state[key]
    }
    return props.wrapper(props.children, values)
  } else {
    return props.children
  }
}

module.exports = UibookWrapper
