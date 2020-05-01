

const interfaces = {};

function detectNodeEnv() {
	if (typeof process === 'object') {
	  if (typeof process.versions === 'object') {
	    if (typeof process.versions.node !== 'undefined') {
	      return true
	    }
	  }
	}
	return false
}

function getAllMembers(toCheck) {
    var obj = toCheck,props = [];
    do { props = props.concat(Object.getOwnPropertyNames(obj));} while (obj = Object.getPrototypeOf(obj));
    return props;
};
function getAllNonRootMembers(toCheck,root) {
	var _ = getAllMembers(toCheck);
	var __ = getAllMembers(root);
	return _.filter(a => __.indexOf(a) === -1);
};
function isNotDefined(input) {
	return (input === undefined || input === null);
};

function interface(proto) {
	var s = Symbol(proto),iface = {
		symbol: s,
		proto,
		staticFunctions: {},
		staticMembers: {},
		functions: {},
		members: {}
	},t,_;
	for(const staticKey of getAllNonRootMembers(proto,Object)) {
		t = typeof proto[staticKey];
		switch(t) {
			case 'function':
				iface.staticFunctions[staticKey] = {
					size: proto[staticKey].length,
					type: proto[staticKey].name
				};
			break;
			case 'object':
				iface.staticMembers[staticKey] = {
					object: true,
					type: proto[staticKey].constructor.name
				};
			break;
			default: 
				iface.staticMembers[staticKey] = {
					object: false,
					type: t
				};
		};
	}
	_ = new proto();
	for(const key of getAllNonRootMembers(_,new Object())) {
		t = typeof _[key];
		switch(t) {
			case 'function':
				iface.functions[key] = {
					size: _[staticKey].length,
					type: _[staticKey].name
				};
				iface.functions[key] = _[key].length;
			break;
			case 'object':
				iface.members[key] = {
					object: true,
					type: _[key].constructor.name
				};
			break;
			default: 
				iface.members[key] = {
					object: false,
					type: t
				};
		};
	}
	interfaces[s] = iface;
	return s;
}

function enforceInterface(iface,on) {
	var selfDestruct = false
	if(typeof iface !== "symbol") {
		if(typeof iface === "function") {
			selfDestruct = true
			iface = interface(iface)
		}
	}
	if(!interfaces[iface]) throw new Error("Interface not defined: ("+iface+")")
	iface = interfaces[iface]
	if(iface.proto.length !== on.length) throw new Error("Constructor implementing "+iface.symbol+" requires "+iface.proto.length+" arguments but "+on.length+" were defined")
	for(const sf in iface.staticFunctions) {
		if(isNotDefined(on[sf])) throw new Error("Static Function ["+sf+"] (required from interface "+iface.symbol+") is not implemented")
		if(on[sf].length !== iface.staticFunctions[sf]) throw new Error("Static Function ["+sf+"] (required from interface "+iface.symbol+") expects "+iface.staticFunctions[sf]+" arguments but "+(on[sf].length)+" were defined")
	}
	for(const sm in iface.staticMembers) {
		if(isNotDefined(on[sm])) throw new Error("Static Member ["+sm+"] (required from interface "+iface.symbol+") is not implemented")
		if(iface.staticMembers[sm].object === true && on[sm].constructor.name !== iface.staticMembers[sm].type) throw new Error("Static Member ["+sm+"] (required from interface "+iface.symbol+") is expected to be of type \""+iface.staticMembers[sm].type+"\" but \""+on[sm].constructor.name+"\" was provided")
		if(iface.staticMembers[sm].object === false && typeof on[sm] !== iface.staticMembers[sm].type) throw new Error("Static Member ["+sm+"] (required from interface "+iface.symbol+") is expected to be of type \""+iface.staticMembers[sm].type+"\" but \""+(typeof on[sm])+"\" was provided")
	}
	var _ = new on()
	for(const f in iface.functions) {
		if(isNotDefined(_[f])) throw new Error("Function ["+f+"] (required from interface "+iface.symbol+") is not implemented")
		if(_[f].length !== iface.functions[f]) throw new Error("Function ["+f+"] (required from interface "+iface.symbol+") expects "+iface.functions[f]+" arguments but "+(_[f].length)+" were defined")
	}
	for(const m in iface.members) {
		if(isNotDefined(_[m])) throw new Error("Member ["+m+"] (required from interface "+iface.symbol+") is not implemented")
		if(iface.members[m].object === true && _[m].constructor.name !== iface.members[m].type) throw new Error("Member ["+m+"] (required from interface "+iface.symbol+") is expected to be of type \""+iface.members[m].type+"\" but \""+_[m].constructor.name+"\" was provided")
		if(iface.members[m].object === false && typeof _[m] !== iface.members[m].type) throw new Error("Member ["+m+"] (required from interface "+iface.symbol+") is expected to be of type \""+iface.members[m].type+"\" but \""+(typeof _[m])+"\" was provided")
	}
	if(selfDestruct) delete interfaces[iface]
	return on
}

function Implementable(extension = class EmptyClass {}) {
	return class Implementation extends extension {
		static implements(iface) {return enforceInterface(iface,this)}
	}
}

if(detectNodeEnv()) {
	global.interface = interface;	
	global.Implementable = Implementable
} else {
	window.interface = interface;	
	window.Implementable = Implementable
}
