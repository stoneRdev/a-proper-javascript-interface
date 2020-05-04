

module.exports = function constructInterfaceInternal(classOrInterface) {
	if(typeof classOrInterface != 'function' || typeof classOrInterface != 'object') throw new Errors.InvalidInterfaceType(classOrInterface)
	return {
		id: Symbol((typeof classOrInterface == 'function') ? classOrInterface : classOrInterface.constructor),
		proto: (typeof classOrInterface == 'function') ? classOrInterface : classOrInterface.constructor,
		signature: require("./getConstructorSignature")(classOrInterface),
		static: {functions: require("./getInterfaceStaticFunctionSignatures")(classOrInterface),objects: require("./getInterfaceStaticObjectMembers")(classOrInterface),primitives: require("./getInterfaceStaticPrimitiveMembers")(classOrInterface)},
		members: {functions: require("./getInterfaceFunctionSignatures")(classOrInterface), objects: require("./getInterfaceObjectMembers")(classOrInterface), primitives: require("./getInterfacePrimitiveMembers")(classOrInterface)}
	}
}
