
require('../../index.js')

class Implementor extends Implementable() {
	static aStaticFunction(needs,three,args) {
		//implementation
	}
	aFunction(needs,two) {
		//implementation
	}
	constructor(onlyNeedsOne) {
		this.booleanMember = true
		this.numberMember = 5782
		this.stringMember = "testing 1. 2. 4?"
		this.objectMember = {iGot: "a friend in me"}
		this.arrayMember = ["shelves","at","walmart","are","emptier","than","me"]
		this.functionMember = (onlyNeeds,two) => {
			//implementation
		}
	}
}
Implementor.staticObjectMember = {iAm:"big brother"}
Implementor.implements(require('./interface.js'))