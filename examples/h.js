h
//Example 1: export interface symbol

class AnInterface {
	static aStaticFunction(expects,two){}
	aFunction(expects,one,more){}
	constructor(we,want,moar,args) {
		this.aStringMember = ""
		this.anObjectMemeber = {}
		this.aBoolMember = true
		this.aNumberMember = 0
		this.someTestFunction = (a,b) => {}



		//now, if for example, some other factoy/constructor have these same issues,
		//you as the developer will have to figure out how to get a "dummy" instance
		// like the fs example above
		//also to note:
		// * the mechanism behind this  takes the length and name properties if the
		//	 member is a function, so in theory, you could dynamically set 
		//   enforced functions by faking a functions signature, 
		//   but this behaviour is undefined (for now)
		//   i.e.
			let dynamicFunction = (new Function(`return function ${dynamicName}(${new Array(dynamicLength).fill(0).map((a,i) => `arg${i}`)}){}`))()

		// * if an object is provided, the name of the constructor will be taken 
		//   as the type, so this could be dynamically set by patching the constructors name
		//   i.e.
			let dynamicObjectType = (new Function(`return new (class ${dynamicClassType} {})`))()

		// * if the member is not a function nor object , the type is 
		//   stored and compared using typeof.
	}
}
AnInterface.aStaticArrayMember = []

module.exports = interface(AnInterface)


//someClass.js

class SomeClass extends Implementable() {
	static aStaticFunction(a,b) {
		return a+ b
	}
	aFunction(a,b,c) {
		return a+b+c
	}
	someTestFunction(a,b) {}
	constructor(a,b,c,d) {
		this.aStringMember = "testing 1. 2. 4?"
		this.anObjectMemeber = {thisIsCool: false}
		this.aBoolMember = false
		this.aNumberMember = 28363
	}
}
SomeClass.aStaticArrayMember = [1,2,"buckle","my","shoe"]
module.exports = SomeClass.implements(require('interface.js'))