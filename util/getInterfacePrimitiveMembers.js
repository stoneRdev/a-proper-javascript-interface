


module.exports = function getInterfacePrimitiveMembers(classOrInstance) {
	if(typeof classOrInstance == "function")  {
		classOrInstance = new classOrInstance
		return require('./getAllMembers')(classOrInstance).map(key => (typeof classOrInstance[key] != "object" && typeof classOrInstance[key] != 'function') ? {name: key,type: typeof classOrInstance[key]} : false).filter(a => a)
	} else if(typeof classOrInstance == "object") return require('./getAllMembers')(classOrInstance).map(key => (typeof classOrInstance[key] != "object" && typeof classOrInstance[key] != 'function') ? {name: key,type: typeof classOrInstance[key]} : false).filter(a => a)
	else throw new Error('Cannot get primitive members from type: '+(typeof classOrInstance))
} 

