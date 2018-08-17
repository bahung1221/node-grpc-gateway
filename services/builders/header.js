/**
 * Receive protobuf conditions object,
 * then response a standard conditions object
 *
 * @param conditions
 */
function parseHeaders(conditions) {
  let obj = {}

  // Loop over conditions array and mapping all element into general object
  for (let index in conditions) {
    let el = conditions[index]

    // If element is valid, assign it into general object
    if (el.header) {
      Object.assign(obj, el.header)
    }
  }
  return obj
}

module.exports = {
  parseHeaders: parseHeaders
}
