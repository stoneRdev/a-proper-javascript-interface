
//Example 2: implement interface

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