module.exports = function (event) {
  if (event.screenX > 0) event.currentTarget.blur()
}
