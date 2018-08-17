/**
 * Receive protobuf conditions object,
 * then response a standard conditions object
 *
 * @param conditions
 */
function parseConditions(conditions) {
  let obj = {}

  // Loop over conditions array and mapping all element into general object
  for (let index in conditions) {
    let el = conditions[index]

    // If element is valid, assign it into general object
    if (el.con) {
      Object.assign(obj, el.con)
    }
  }
  return obj
}

module.exports = {
  parseConditions: parseConditions
}
