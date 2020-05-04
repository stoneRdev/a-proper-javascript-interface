const Errors = require('./errors')

module.exports = function enforceInterface(interfaces,iface,on,argv,implementsTable) {
	let selfDestruct = false,_interface,argc
	if(typeof iface !== "symbol") {
		selfDestruct = true
		if(typeof iface !== "function") throw new Errors.InvalidInterfacetype(iface)
		iface = interface(iface)
		_interface = interfaces[iface]
	} else if(interfaces[iface]) {
		_interface = interfaces[iface]
	} else throw new Errors.UndefinedInterface(iface)
	if(implementsTable.indexOf(iface) === -1) implementsTable.push(iface)
	if(typeof on !== "function" || typeof on !== "object") throw new Errors.InvalidImplementingType(on)
	if(typeof on === "function") {
		if(on.length !== _interface.signature) throw new Errors.ConstructorSignatureError(_interface,on)
		if(Array.isArray(argv)) argc = argv.length
		else if(argv) argc = 1
		else argc = 0
		if(argc != on.length) throw new Errors.ProvidedArgumentsLengthError(_interface,on,argv,argc)
		try {
			if(Array.isArray(argv)) on = new on(...argv)
			else if(argv) on = new on(argv)
			else on = new on	
		} catch(e) throw new Errors.ImplementConstructionError(e,argv,on,_interface)
	}
	for(const fk of _interface.members.functions) {
		if(on[fk] === undefined || on[fk] === null) throw new Errors.FunctionMissing(fk,_interface)
		if(on[fk].name !== _interface.members.functions[fk].name) throw new Errors.FunctionNameMisMatch(fk,_interface,on)
		if(on[fk].length !== _interface.members.functions[fk].argc) throw new Errors.FunctionSignatureMisMatch(fk,_interface,on)
	}
	for(const ok of _interface.members.objects) {
		if(on[ok] === undefined || on[ok] === null) throw new Errors.ObjectMissing(ok,_interface)
		if(on[ok].name !== _interface.members.objects[ok].type) throw new Errors.ObjectTypeMisMatch(ok,_interface,on)
	}
	for(const pk of _interface.members.primitives) {
		if(on[pk] === undefined || on[pk] === null) throw new Errors.PrimitivedMissing(pk,_interface)
		if(typeof on[pk] !== _interface.members.primitives[pk].type) throw new Errors.PrimitiveTypeMisMatch(pk,_interface,on)
	}
	for(const sfk of _interface.static.functions) {
		if(on.constructor[sfk] === undefined || on.constructor[sfk] === null) throw new Errors.StaticFunctionMissing(sfk,_interface)
		if(on.constructor[sfk].name !== _interface.static.functions[sfk].name) throw new Errors.StaticFunctionNameMisMatch(sfk,_interface,on.constructor)
		if(on.constructor[sfk].length !== _interface.static.functions[sfk].argc) throw new Errors.StaticFunctionSignatureMisMatch(sfk,_interface,on.constructor)
	}
	for(const sok of _interface.static.objects) {
		if(on.constructor[sok] === undefined || on.constructor[sok] === null) throw new Errors.StaticObjectMissing(sok,_interface)
		if(on.constructor[sok].constructor.name !== _interface.static.objects[sok].type) throw new Errors.StaticObjectTypeMisMatch(sok,_interface,on.constructor)
	}
	for(const spk of _interface.static.primitives) {
		if(on.constructor[spk] === undefined || on.constructor[spk] === null) throw new Errors.StaticPrimitivedMissing(spk,_interface)
		if(typeof on.constructor[spk] !== _interface.static.primitives[spk].type) throw new Errors.StaticPrimitiveTypeMisMatch(spk,_interface,on.constructor)
	}
	if(selfDestruct) delete interfaces[iface]
	return on
}
