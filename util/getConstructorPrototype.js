

module.exports = function getConstrutorSignature(classOrInstance) {
	if(typeof classOrInstance === "function") {
		return {
			name: classOrInstance.name,
			expectedArgs: classOrInstance.length
		}
	} else if(typeof classOrInstance === 'object') {
		return {
			name: classOrInstance.constructor.name,
			expectedArgs: classOrInstance.constructor.length
		}
	} else {
		throw new Error("Cannot get constructor signature from type: "+(typeof classOrInstance))
	}
}