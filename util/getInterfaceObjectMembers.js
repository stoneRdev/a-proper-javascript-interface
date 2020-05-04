
module.exports = function getInterfaceObjectMembers(classOrInstance) {
	if(typeof classOrInstance == "function")  {
		classOrInstance = new classOrInstance
		return require('./getAllMembers')(classOrInstance).map(key => (typeof classOrInstance[key] == "object") ? {name: key,type: classOrInstance[key].constructor.name} : false).filter(a => a)
	} else if(typeof classOrInstance == "object") return require('./getAllMembers')(classOrInstance).map(key => (typeof classOrInstance[key] == "object") ? {name: key,type: classOrInstance[key].constructor.name} : false).filter(a => a)
	else throw new Error('Cannot get object members from type: '+(typeof classOrInstance))
} 
