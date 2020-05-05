
class BaseError extends Error {
	constructor(message) {
		super(`Error enforcing interface: ${message}`)
		this.name = this.constructor.name
	}
}

const Errors = {
	EnforceInstanceWithoutInstance: class EnforceInstanceWithoutInstance extends BaseError {
		constructor(iface,impl) {
			super()
			this.interface = iface
			this.implementingClass = impl
			this.message += `Cannot enforce instance members on class (${impl.name}) {implementing: (${iface.id.toString()})}) without instance! {Did you filter interface.MEMBERS without interface.CONSTRUCT?}`
		}
	},
	InvalidInterfaceType: class InvalidInterfaceType extends BaseError {
		constructor(iface) {
			super()
			this.interface = iface
			this.message += `Cannot enforce non-class interface types! {Got type: [${typeof iface}]}`
		}
	},
	UndefinedInterface: class UndefinedInterface extends BaseError {
		constructor(iface) {
			super()
			this.interfaceSymbol = iface
			this.message += `Interface symbol not defined: (${iface.toString()})`
		}
	},
	InvalidImplementingType: class InvalidImplementingType extends BaseError {
		constructor(impl) {
			super()
			this.implementingType = impl
			this.message += `Can only implement an interface on classes or class instances! {Got type: [${typeof impl}]}`
		
		}
	},
	InvalidConstructorType: class InvalidConstructorType extends BaseError {
		constructor(inst) {
			super()
			this.errorFocus = inst
			this.message += `Cannot create constructor signature from type: ${typeof inst}`
		}
	},
	ImplementConstructionError: class ImplementConstructionError extends BaseError {
		constructor(e,args,impl,iface) {
			super()
			this.originalError = e
			this.interfaceObject = iface
			this.attemptedArguments = args
			this.implementingClass = impl
			this.message += `An error occured while constructing the class (${impl.name})${(Array.isArray(args)) ? ` {arguments were [${args.join(', ')}]}` : args ? ` {argument was [${args.toString()}]}` : ' '}implementing the interface (${iface.id.toString()}). {Error message: [${e.message}]}`
		}
	},
	ConstructorSignatureError: class ConstructorSignatureError extends BaseError {
		constructor(iface,impl) {
			super()
			this.interface = iface
			this.implementing = impl
			this.message += `Constructor signature mis-match! Interface (${iface.proto.name}) signature expects [${iface.signature}] arguments but the implementing class only defines [${impl.length}]!`
		}
	},
	ProvidedArgumentsLengthError: class ProvidedArgumentsLengthError extends BaseError {
		constructor(iface,impl,args,argc) {
			super()
			this.interface = iface
			this.implementing = impl
			this.attemptedArguments = args
			this.attemptedArgumentsLength = argc
			this.message += `Cannot construct implementing class: provided argument length mis-match! Implementing class (${impl.name}) {implementing interface (${iface.id.toString()})} expects [${impl.length}] arguments, but was only provided with [${argc}]${(Array.isArray(args)) ? ` {Provided arguments: [${args.join(', ')}]}` : args ? ` {Provided argument: [${args.toString()}]}` : '{No arguments provided}'}`
		}
	},
	StaticFunctionMissing: class StaticFunctionMissing extends BaseError {
		constructor(memberName,iface) {
			super()
			this.memberName = memberName
			this.interface = iface
			this.message += `Static function (${memberName}) missing from implemeting class! (Expected to be a static function named [${iface.static.functions[memberName].name}] and expects [${iface.static.functions[memberName].argc}] arguments)`
		}
	},
	StaticFunctionNameMisMatch: class StaticFunctionNameMisMatch extends BaseError {
		constructor(memberName,iface,impl) {
			super()
			this.memberName = memberName
			this.interface = iface
			this.implementing = impl
			this.message += `Static function (${memberName}) was expected to be named [${iface.static.functions[memberName].name}] but was named [${impl[memberName].name}]`
		}
	},
	StaticFunctionSignatureMisMatch: class StaticFunctionSignatureMisMatch extends BaseError {
		constructor(memberName,iface,impl) {
			super()
			this.memberName = memberName
			this.interface = iface
			this.implementing = impl
			this.message += `Static function (${memberName}) was expected to have a signature of [${iface.static.functions[memberName].argc}] but was got [${impl[memberName].length}]`
		}
	},
	StaticObjectMissing: class StaticObjectMissing extends BaseError {
		constructor(memberName,iface) {
			super()
			this.memberName = memberName
			this.interface = iface
			this.message += `Static object member (${memberName}) missing from implemeting class! (Expected to be an object named [${iface.static.objects[memberName].name}] and expects a type of [${iface.static.objects[memberName].type}])`
		}
	},
	StaticObjectTypeMisMatch: class StaticObjectTypeMisMatch extends BaseError {
		constructor(memberName,iface,impl) {
			super()
			this.memberName = memberName
			this.interface = iface
			this.implementing = impl
			this.message += `Static object member (${memberName}) was expected to have a type of [${iface.static.objects[memberName]}] but got [${impl[memberName].constructor.name}]`
		}
	},
	StaticPrimitiveMissing: class StaticPrimitiveMissing extends BaseError {
		constructor(memberName,iface) {
			super()
			this.memberName = memberName
			this.interface = iface
			this.message += `Static primitive member (${memberName}) missing from implemeting class! (Expected to be a primitive of type [${iface.static.primitives[memberName].type}])`
		}
	},
	StaticPrimitiveTypeMisMatch: class StaticPrimitiveTypeMisMatch extends BaseError {
		constructor(memberName,iface,impl) {
			super()
			this.memberName = memberName
			this.interface = iface
			this.implementing = impl
			this.message += `Static primitive member (${memberName}) was expected to be of type [${iface.static.primitives[memberName]}] but got type [${typeof impl[memberName]}]`
		}
	},
	FunctionMissing: class FunctionMissing extends BaseError {
		constructor(memberName,iface) {
			super()
			this.memberName = memberName
			this.interface = iface
			console.log(iface) //tag
			this.message += `Function (${memberName}) missing from implemeting class! (Expected to be a static function named [${iface.members.functions[memberName].name}] and expects [${iface.members.functions[memberName].argc}] arguments)`
		}
	},
	FunctionNameMisMatch: class FunctionNameMisMatch extends BaseError {
		constructor(memberName,iface,impl) {
			super()
			this.memberName = memberName
			this.interface = iface
			this.implementing = impl
			this.message += `Function (${memberName}) was expected to be named [${iface.members.functions[memberName].name}] but was named [${impl[memberName].name}]`
		}
	},
	FunctionSignatureMisMatch: class FunctionSignatureMisMatch extends BaseError {
		constructor(memberName,iface,impl) {
			super()
			this.memberName = memberName
			this.interface = iface
			this.implementing = impl
			this.message += `Function (${memberName}) was expected to have a signature of [${iface.members.functions[memberName].argc}] but was got [${impl[memberName].length}]`
		}
	},
	ObjectMissing: class ObjectMissing extends BaseError {
		constructor(memberName,iface) {
			super()
			this.memberName = memberName
			this.interface = iface
			this.message += `Object member (${memberName}) missing from implemeting class! (Expected to be an object named [${iface.members.objects[memberName].name}] and expects a type of [${iface.members.objects[memberName].type}])`
		}
	},
	ObjectTypeMisMatch: class ObjectTypeMisMatch extends BaseError {
		constructor(memberName,iface,impl) {
			super()
			this.memberName = memberName
			this.interface = iface
			this.implementing = impl
			this.message += `Object member (${memberName}) was expected to have a type of [${iface.members.objects[memberName].type}] but was got [${impl[memberName].type}]`
		}
	},
	PrimitiveMissing: class PrimitiveMissing extends BaseError {
		constructor(memberName,iface) {
			super()
			this.memberName = memberName
			this.interface = iface
			this.message += `Primitive member (${memberName}) missing from implemeting class! (Expected to be a primitive of type [${iface.members.primitives[memberName].type}])`
		}
	},
	PrimitiveTypeMisMatch: class PrimitiveTypeMisMatch extends BaseError {
		constructor(memberName,iface,impl) {
			super()
			this.memberName = memberName
			this.interface = iface
			this.implementing = impl
			this.message += `Primitive member (${memberName}) was expected to be of type [${iface.members.primitives[memberName]}] but got type [${typeof impl[memberName]}]`
		}
	}
}

module.exports = Errors