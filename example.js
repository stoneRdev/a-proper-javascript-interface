

//the system works like this:
//a class is defined as an interface and passed through the global 'interface' function,
//which returns a symbol that refers to the interface.
//A symbol pointing to the interfacee is returned to ensure that 
//interfaces arent accidentally extended normally.
//This symbol would then be exported from the module

module.exports = interface(class AnInterface {})


//creating an interface is easy: it's a simple class
//everything on the class will be enforced, down to number of arguments to a function and member type

class AnInterface {
	//static functions are enforced, event the two expected arguments
	static aStaticFunction(expects,two){}
	//instance functions are enforced, again, with the arguments
	aFunction(expects,one,more){}
	//the constructor is event constrained in argument length
	constructor(we,want,moar,args) {
		//member types are created from the 
		//properties defined on the instance from the constructor.
		//the type of the member is determined from the type of the member.
		//the value of the member is not important, as only the type is needed

		//primitive values are accepted
		this.aStringMember = ""
		this.anObjectMemeber = {}
		this.aBoolMember = true
		this.aNumberMember = 0

		//as well as Objects (including user-defined)
		this.someTreeMap = new SomeTreeMap()
		this.aSimpleTreeMap = {}
		// and even functions.
		this.someTestFunction = (a,b) => {}
		//this will designate that implementing classes must define "someTestFunction" with two arguments

		//constructors are even enforced
		this.treeMapConstructor = SomeTreeMap
		// a caveat here is that the interface constructor
		//is called without arguments to collect all fields
		//this means that if a object needs to be created based on input,
		//there could be issues

		//i.e. the Stats object factory functions expect some input, and complain 
		//if they don't get it
		this.someFileStats = fs.statSync() //Error path arguments is exected to be blah blah blah
		//so, a way around this is unfortunately gonna take some minor problem solving 
		//For example, all stats objects are the same, regardless of info contained within.
		//so passing a random path (that you know exists) will shut it up
		this.someFileStats = fs.statSync('.') // we now the directory were in exists
		this.someFileStats = fs.statSync('/') // i shouldnt have to say why this is a no-no


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

//static members are enforced the same way as instance members
AnInterface.aStaticArrayMember = []
