module.exports = function (object1, object2) {
  var output = {}

  for (var key1 in object1) {
    output[key1] = object1[key1]
  }
  for (var key2 in object2) {
    output[key2] = object2[key2]
  }
  return output
}
