
class Interface {
	static aStaticFunction(needs,three,args) {}
	aFunction(needs,two) {}
	constructor(onlyNeedsOne) {
		this.booleanMember = false
		this.numberMember = 0
		this.stringMember = ""
		this.objectMember = {}
		this.arrayMember = []
		this.functionMember = (onlyNeeds,two) => {}
	}
}
Interface.staticObjectMember = {}
Interface.staticFunctionMember = (I,need,a,lot,of,args) =>{}
module.exports = interface(Interface)