var React = require('react')

var isClassComponent = function (component) {
  return typeof component === 'function' &&
    !!component.prototype.isReactComponent
}

var isFunctionComponent = function (component) {
  return typeof component === 'function' &&
    String(component).indexOf('return') !== -1 &&
    String(component).indexOf('createElement') !== -1
}

var isReactComponent = function (component) {
  return isClassComponent(component) ||
    isFunctionComponent(component)
}

var isElement = function (element) {
  return React.isValidElement(element)
}

var stringify = function (value, depth) {
  if (depth > 2) return '…'

  if (value === null) {
    return 'null'
  } else if (isElement(value)) {
    return 'h(ReactElement)'
  } else if (isReactComponent(value)) {
    return 'h(ReactComponent)'
  } else if (typeof value === 'object' && Object.keys(value).length === 0) {
    return '{ }'
  } else if (typeof value === 'object') {
    return '{ ' + Object.keys(value).map(function (i) {
      if (typeof value[i] === 'function') {
        return isFunctionComponent(value[i]) ? i + ': h(ReactComponent)' : i
      } else {
        return i + ': ' + stringify(value[i], (depth || 0) + 1)
      }
    }).join(', ') + ' }'
  } else if (typeof value === 'string') {
    return '\'' + value.replace(/\\/g, '\\\\').replace(/'/g, '\\\'') + '\''
  } else if (typeof value === 'boolean') {
    return value
  } else {
    return '…'
  }
}

module.exports = stringify
