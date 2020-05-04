
const Errors = require('./errors')

module.exports = function getConstructorSignature(classOrInstance) {
	if(typeof classOrInstance === "function") return classOrInstance.length
	else if(typeof classOrInstance === 'object') return classOrInstance.constructor.length
	else throw new Errors.InvalidConstructorType(classOrInstance)
}