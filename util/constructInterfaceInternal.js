
const Errors = require('./errors')

module.exports = function constructInterfaceInternal(classOrInterface) {
	if(typeof classOrInterface !== 'function' && typeof classOrInterface !== 'object') throw new Errors.InvalidInterfaceType(classOrInterface)
	const ifaceInternal = {
		id: Symbol((typeof classOrInterface == 'function') ? classOrInterface.name : classOrInterface.constructor.name),
		proto: (typeof classOrInterface == 'function') ? classOrInterface : classOrInterface.constructor,
		signature: require("./getConstructorSignature")(classOrInterface),
		static: {
			functions: {},
			objects: {},
			primitives: {}
		},
		members: {
			functions: {},
			objects: {},
			primitives: {}
		}
	}
	for(const sfd of (require("./getInterfaceStaticFunctionSignatures")(classOrInterface))) ifaceInternal.static.functions[sfd.key] = {name:	sfd.name,argc: sfd.argc}
	for(const sod of (require("./getInterfaceStaticObjectMembers")(classOrInterface))) ifaceInternal.static.objects[sod.name] = sod.type
	for(const spd of (require("./getInterfaceStaticPrimitiveMembers")(classOrInterface))) ifaceInternal.static.primitives[spd.name] = spd.type
	for(const fd of (require("./getInterfaceFunctionSignatures")(classOrInterface))) ifaceInternal.members.functions[fd.key] = {name: fd.name,argc: fd.argc}
	for(const od of (require("./getInterfaceObjectMembers")(classOrInterface))) ifaceInternal.members.objects[od.name] = od.type
	for(const pd of (require("./getInterfacePrimitiveMembers")(classOrInterface))) ifaceInternal.members.primitives[pd.name] = pd.type
	return ifaceInternal
}
