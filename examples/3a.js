h
//Example 3: picky constructors/generators

class AnInterface {
	constructor() {
		//Say, for example, you need to enforce that classes implementing this interface 
		//require a member object of the type 'Stats' (returned from fs.stat, lets just say fs.statSync)

		//the fs.statSync (and fs.stat for that matter) functions expect a path, which an interface
		//has no business knowing (unless its a member enforced on the interface, but thats not applicable)

		//So, you can get around this by dynamically creating a class of the same type, then 
		//creating an instance of it,such as:
		this.statsObject = new (class Stats {})()

		//This works similarily is you need a function, and also need input to get that 
		//function, but still requires knowing the type beforehand
		this.func = function neededFunctionNameHere(needed,args,here){}

		//In a future version, there will be something to make this easier, but for now, this
		//is a workaround
	}
}
module.exports = interface(AnInterface)