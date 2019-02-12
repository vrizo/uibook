var stringify = function (value) {
  if (value === null) {
    return 'null'
  } else if (typeof value === 'object' && Object.keys(value).length === 0) {
    return '{ }'
  } else if (typeof value === 'object') {
    return '{ ' + Object.keys(value).map(function (i) {
      if (typeof value[i] === 'function') {
        return i
      } else {
        return i + ': ' + JSON.stringify(value[i])
      }
    }).join(', ') + ' }'
  } else if (typeof value === 'string') {
    return '\'' + value.replace(/\\/g, '\\\\').replace(/'/g, '\\\'') + '\''
  } else {
    return JSON.stringify(value)
  }
}

module.exports = stringify
