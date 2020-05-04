
module.exports = function getInterfaceFunctionSignatures(classOrInstance) {
	if(typeof classOrInstance == "function")  {
		classOrInstance = new classOrInstance
		return require('./getAllMembers')(classOrInstance).map(key => (typeof classOrInstance[key] == "function") ? {key,name: classOrInstance[key].name,argc: classOrInstance[key].length} : false).filter(a => a)
	} else if(typeof classOrInstance == "object") return require('./getAllMembers')(classOrInstance).map(key => (typeof classOrInstance[key] == "function") ? {key, name: classOrInstance[key].name,argc: classOrInstance[key].length} : false).filter(a => a)
	else throw new Error('Cannot get function signatures from type: '+(typeof classOrInstance))
} 