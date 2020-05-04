

const interfaces = {};

const constructInterface = require('./util/constructInterfaceInternal')
const enforceInterface = require('./util/enforceInterface')

const implementsSymbol = Symbol()
const implementsTable = Symbol()

if(typeof global === "object") global.implements = implementsSymbol
if(typeof window === "object") window.implements = implementsSymbol
if(typeof self === "object") self.implements = implementsSymbol


function interface(proto) {
	const iface = constructInterface(proto)
	interfaces[iface.id] = iface
	return iface.id
}
if(typeof global === "object") global.interface = interface
if(typeof window === "object") window.interface = interface
if(typeof self === "object") self.interface = interface

function Implementable(Extension = class EmptyBaseImplementation {}) {
	return class Implementation extends Extension {
		static get [implementsTable]() {
			if(!this[implementsTable]) this[implementsTable] = []
			return this[implementsTable]
		}
		get [implementsTable]() {
			if(!this[implementsTable]) this[implementsTable] = this.constructor[implementsTable]
			return this[implementsTable]
		}
		[implementsSymbol](iface) {
			if(Array.isArray(iface)) return iface.reduce((a,c) => {
					if(a === iface[0]) return this[implementsTable].indexOf(a) > -1 && this[implementsTable].indexOf(c) > -1
					else if(a === false) return false
					else return this[implementsTable].indexOf(c) > -1
				})
			else if(this[implementsTable].indexOf(iface) > -1) return true
		}
		static [implementsSymbol](iface,args = []) {
			if(Array.isArray(iface)) return iface.reduce((a,c)=> {
					if(a === iface[0]) return enforceInterface(interfaces,c,enforceInterface(interfaces,a,this,args,this[implementsTable]),args,this[implementsTable])
					else return enforceInterface(interfaces,c,a,args,this[implementsTable])
				})
			else return enforceInterface(interfaces,iface,this,args,this[implementsTable])
		}
	}
}

if(typeof global === "object") global.Implementable = Implementable
if(typeof window === "object") window.Implementable = Implementable
if(typeof self === "object") self.Implementable = Implementable
