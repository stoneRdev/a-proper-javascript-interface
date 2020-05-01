
//Example 4: Dynamic Interfaces

class AnInterface {
	constructor() {
		//To build on example 3, I have realized that a template and the 
		//Function constructor are saving graces to dynamic types in the interface
		this.dynamicFunction = (new Function(`return function ${dynamicName}(${new Array(dynamicLength).fill(0).map((a,i) => `arg${i}`)}){}`))()

		//and would also work for objects
		this.dynamicObjectType = (new Function(`return new (class ${dynamicClassType} {})`))()
	}
}
module.exports = interface(AnInterface)