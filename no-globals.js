

const interfaces = {};

const constructInterface = require('./util/constructInterfaceInternal')
const enforceInterface = require('./util/enforceInterface')

const implementsSymbol = Symbol("implements")
const implementingSymbol = Symbol("implementing")
const implementsTable = Symbol()
const implementsTableKey = Symbol()

module.exports = {}
module.exports.implements = implementsSymbol
module.exports.implementing = implementingSymbol


function interface(proto) {
	const iface = constructInterface(proto)
	interfaces[iface.id] = iface
	return iface.id
}
interface.CONSTRUCTOR = 0b00000001
interface.CONSTRUCT = 0b00000010
interface.FUNCTIONS = 0b00000100
interface.OBJECTS = 0b00001000
interface.PRIMITIVES = 0b00010000
interface.STATIC_FUNCTIONS = 0b00100000
interface.STATIC_OBJECTS = 0b01000000
interface.STATIC_PRIMITIVES = 0b10000000

interface.ALL_STATIC = interface.STATIC_FUNCTIONS | interface.STATIC_OBJECTS | interface.STATIC_PRIMITIVES
interface.ALL_MEMBERS = interface.FUNCTIONS | interface.OBJECTS | interface.PRIMITIVES
interface.ALL_FUNCTIONS = interface.STATIC_FUNCTIONS | interface.FUNCTIONS
interface.ALL_OBJECTS = interface.STATIC_OBJECTS | interface.OBJECTS
interface.ALL_PRIMITIVES = interface.PRIMITIVES | interface.STATIC_PRIMITIVES
interface.CONSTRUCTION = interface.CONSTRUCTOR | interface.CONSTRUCT
interface.ALL = interface.CONSTRUCTION | interface.ALL_STATIC | interface.ALL_MEMBERS

module.exports.interface = interface

function Implementable(Extension = class EmptyBaseImplementation {}) {
	return class Implementation extends Extension {
		static get [implementsTable]() {
			if(!this[implementsTableKey]) this[implementsTableKey] = []
			return this[implementsTableKey]
		}
		get [implementsTable]() {
			if(!this[implementsTableKey]) this[implementsTableKey] = this.constructor[implementsTable]
			return this[implementsTableKey]
		}
		[implementingSymbol](iface) {
			if(Array.isArray(iface)) return iface.reduce((a,c) => {
					if(a === iface[0]) return this[implementsTable].indexOf(a) > -1 && this[implementsTable].indexOf(c) > -1
					else if(a === false) return false
					else return this[implementsTable].indexOf(c) > -1
				})
			else if(this[implementsTable].indexOf(iface) > -1) return true
		}
		static [implementingSymbol](iface) {
			if(Array.isArray(iface)) return iface.reduce((a,c) => {
					if(a === iface[0]) return this[implementsTable].indexOf(a) > -1 && this[implementsTable].indexOf(c) > -1
					else if(a === false) return false
					else return this[implementsTable].indexOf(c) > -1
				})
			else if(this[implementsTable].indexOf(iface) > -1) return true
		}
		[implementsSymbol](iface) {
			if(Array.isArray(iface)) return iface.reduce((a,c)=> {
					if(a === iface[0]) return enforceInterface(interfaces,c,enforceInterface(interfaces,a,this,[],this[implementsTable]),[],this[implementsTable])
					else return enforceInterface(interfaces,c,a,[],this[implementsTable])
				})
			else return enforceInterface(interfaces,iface,this,[],this[implementsTable])
		}
		static [implementsSymbol](iface,args = []) {
			let last = this
			if(Array.isArray(iface)) return iface.reduce((a,c)=> {
					if(a === iface[0]) return enforceInterface(interfaces,c,enforceInterface(interfaces,a,this,args,this[implementsTable]),args,this[implementsTable])
					else return enforceInterface(interfaces,c,a,args,this[implementsTable])
				})
			else return enforceInterface(interfaces,iface,this,args,this[implementsTable])
		}
	}
}

module.exports.Implementable = Implementable
