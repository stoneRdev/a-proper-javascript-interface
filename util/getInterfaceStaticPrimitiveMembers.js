


module.exports = function getInterfaceStaticPrimitiveMembers(classOrInstance) {
	if(typeof classOrInstance == "function")  return require('./getAllMembers')(classOrInstance).map(staticKey => (typeof classOrInstance[staticKey] != "object" && typeof classOrInstance[staticKey] != "function") ? {name: staticKey,type: typeof classOrInstance[staticKey]} : false).filter(a => a)
	else if(typeof classOrInstance == "object") return require('./getAllMembers')(classOrInstance.constructor).map(staticKey => (typeof classOrInstance.constructor[staticKey] != "object"  && typeof classOrInstance.constructor[staticKey] != "function") ? {name: staticKey,type: typeof classOrInstance.constructor[staticKey]} : false).filter(a => a)
	else throw new Error('Cannot get static primitive members from type: '+(typeof classOrInstance))
}