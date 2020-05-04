
module.exports = function getInterfaceStaticFunctionSignatures(classOrInstance) {
	if(typeof classOrInstance == "function")  return require('./getAllMembers')(classOrInstance).map(staticKey => (typeof classOrInstance[staticKey] == "function") ? {key: staticKey,name: classOrInstance[staticKey].name,argc: classOrInstance[staticKey].length} : false).filter(a => a)
	else if(typeof classOrInstance == "object") return require('./getAllMembers')(classOrInstance.constructor).map(staticKey => (typeof classOrInstance.constructor[staticKey] == "function") ? {key:staticKey, name: classOrInstance.constructor[staticKey].name,argc: classOrInstance.constructor[staticKey].length} : false).filter(a => a)
	else throw new Error('Cannot get static function signatures from type: '+(typeof classOrInstance))
}