var timeout = null

var throttler = function (callback) {
  if (timeout === null) {
    timeout = setTimeout(function () {
      callback()
      timeout = null
    }, 250)
  }
}

module.exports = throttler
