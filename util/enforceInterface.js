const Errors = require('./errors')

module.exports = function enforceInterface(interfaces,iface,on,argv,implementsTable,filter = interface.ALL) {
	let selfDestruct = false,_interface,argc,onInstance
	if(typeof iface !== "symbol") {
		selfDestruct = true
		if(typeof iface !== "function") throw new Errors.InvalidInterfacetype(iface)
		iface = interface(iface)
		_interface = interfaces[iface]
	} else if(interfaces[iface]) {
		_interface = interfaces[iface]
	} else throw new Errors.UndefinedInterface(iface)
	if(implementsTable.indexOf(iface) === -1) implementsTable.push(iface)
	if(typeof on !== "function" && typeof on !== "object") throw new Errors.InvalidImplementingType(on)
	if(typeof on === "function") {
		if(filter & (1 << 0)) if(on.length !== _interface.signature) throw new Errors.ConstructorSignatureError(_interface,on)
		if(argv !== null || argv !== undefined) {
			if(filter & (1 << 1)) {
				let argc = (Array.isArray(argv)) ? argv.length : ((argv !== null || argv !== undefined) ? 1 : 0)
				if(argc !== on.length) throw new Errors.ProvidedArgumentsLengthError(_interface,on,argv,argc)
				try {
					if(Array.isArray(argv)) onInstance = new on(...argv)
					else if(argv) onInstance = new on(argv)
					else onInstance = new on	
				} catch(e) {throw new Errors.ImplementConstructionError(e,argv,on,_interface)}
			}
		} else {
			if(filter & (1 << 1)) {
				if(0 !== on.length) throw new Errors.ProvidedArgumentsLengthError(_interface,on,argv,0)
				try {onInstance = new on} 
				catch(e) {throw new Errors.ImplementConstructionError(e,argv,on,_interface)}
			}
		}		
	} else {
		onInstance = on
		on = on.constructor
		if(filter & (1 << 0)) if(on.length !== _interface.signature) throw new Errors.ConstructorSignatureError(_interface,on)
	}
	if(onInstance && (filter & (1 << 2))) {
		for(const fk in _interface.members.functions) {
			if(onInstance[fk] === undefined || onInstance[fk] === null) throw new Errors.FunctionMissing(fk,_interface)
			if(onInstance[fk].name !== _interface.members.functions[fk].name) throw new Errors.FunctionNameMisMatch(fk,_interface,onInstance)
			if(onInstance[fk].length !== _interface.members.functions[fk].argc) throw new Errors.FunctionSignatureMisMatch(fk,_interface,onInstance)
		}
	} else if((filter & (1 << 2))) throw Errors.EnforceInstanceWithoutInstance(_interface,on)
	if(onInstance && (filter & (1 << 3))) {
		for(const ok in _interface.members.objects) {
			if(onInstance[ok] === undefined || onInstance[ok] === null) throw new Errors.ObjectMissing(ok,_interface)
			if(onInstance[ok].name !== _interface.members.objects[ok].type) throw new Errors.ObjectTypeMisMatch(ok,_interface,onInstance)
		}
	} else if((filter & (1 << 3))) throw Errors.EnforceInstanceWithoutInstance(_interface,on)
	if(onInstance && (filter & (1 << 4))) {
		for(const pk in _interface.members.primitives) {
			if(onInstance[pk] === undefined || onInstance[pk] === null) throw new Errors.PrimitivedMissing(pk,_interface)
			if(typeof onInstance[pk] !== _interface.members.primitives[pk]) throw new Errors.PrimitiveTypeMisMatch(pk,_interface,onInstance)
		}
	} else if((filter & (1 << 4))) throw Errors.EnforceInstanceWithoutInstance(_interface,on)
	if(filter & (1 << 5)) {
		for(const sfk in _interface.static.functions) {
			if(on[sfk] === undefined || on[sfk] === null) throw new Errors.StaticFunctionMissing(sfk,_interface)
			if(on[sfk].name !== _interface.static.functions[sfk].name) throw new Errors.StaticFunctionNameMisMatch(sfk,_interface,on)
			if(on[sfk].length !== _interface.static.functions[sfk].argc) throw new Errors.StaticFunctionSignatureMisMatch(sfk,_interface,on)
		}
	}
	if(filter & (1 << 6)) {
		for(const sok in _interface.static.objects) {
			if(on[sok] === undefined || on[sok] === null) throw new Errors.StaticObjectMissing(sok,_interface)
			if(on[sok].constructor.name !== _interface.static.objects[sok]) throw new Errors.StaticObjectTypeMisMatch(sok,_interface,on)
		}
	}
	if(filter & (1 << 7)) {
		for(const spk in _interface.static.primitives) {
			if(on[spk] === undefined || on[spk] === null) throw new Errors.StaticPrimitivedMissing(spk,_interface)
			if(typeof on[spk] !== _interface.static.primitives[spk]) throw new Errors.StaticPrimitiveTypeMisMatch(spk,_interface,on)
		}
	}	
	if(selfDestruct) delete interfaces[iface]
	return onInstance || on
}
