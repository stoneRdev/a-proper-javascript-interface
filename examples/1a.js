
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
	}
}
AnInterface.aStaticArrayMember = []

module.exports = interface(AnInterface)