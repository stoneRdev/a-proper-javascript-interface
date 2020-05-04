
module.exports = function getInterfaceStaticObjectMembers(classOrInstance) {
	if(typeof classOrInstance == "function")  return require('./getAllMembers')(classOrInstance).map(staticKey => (typeof classOrInstance[staticKey] == "object") ? {name: staticKey,type: classOrInstance[staticKey].constructor.name} : false).filter(a => a)
	else if(typeof classOrInstance == "object") return require('./getAllMembers')(classOrInstance.constructor).map(staticKey => (typeof classOrInstance.constructor[staticKey] == "object") ? {name: staticKey,type: classOrInstance.constructor[staticKey].constructor.name} : false).filter(a => a)
	else throw new Error('Cannot get static object members from type: '+(typeof classOrInstance))
}