
module.exports = function getAllMembers(classOrInstance) {
	let props = [],obj = classOrInstance
	do { props = props.concat(Object.getOwnPropertyNames(obj)) } 
	while(obj = Object.getPrototypeOf(obj))
	return props.filter(a => [ 'length', 'prototype', 'name', 'arguments', 'caller', 'constructor', 'apply', 'bind', 'call', 'constructor', '__defineGetter__', '__defineSetter__', 'hasOwnProperty', '__lookupGetter__', '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable', 'toString', 'valueOf', '__proto__', 'toLocaleString'].indexOf(a) === -1)
}