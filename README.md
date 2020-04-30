
## A Proper Interface
*A more proper interface system for javascript*

## Contents 
[Installation](#installation)

[Usage](#usage)

[Ideology](#ideology)

[Execution](#execution)

[How It Works](#how-it-works)

[Caveats](#caveats)

[Footnotes](#footnotes)


#### installation
*Lemme see what this is all about*

`npm -i a-proper-interface`
*or*
`yarn add a-proper-interface` 


### Usage
*Ok, so how do I use this weird little contraption you got here?*

Usage was made to be simple (as can be)

Somewhere near the entrance to your code, put `require('a-proper-interface')` and your ready to go

#### Declaring/Using an interface
##### Option 1 - Symbols

```javascript
//someInterface.js
module.exports = interface(class SomeInterfaceClass {})

//someImplementation.js
class SomeImplementation extends Implementable() {}
SomeImplementation.implements(require('someInterface.js'))
```

#### Option 2 - No Symbols

```javascript
//someInterface.js
interface(class SomeInterfaceClass {})
module.exports = SomeInterfaceClass

//someImplementation.js
class SomeImplementation extends Implementable() {}
SomeImplementation.implements(require('someInterface.js'))
```

*and that's it*
Everything from the number of arguments expected on functions (even constructors) and type of object down to whether the member is static or not is compared and enforced 


### Ideology
*Why would you even...?*

I was building a remote code execution library, and came across a strong desire to enforce a set of functions for said remote code. Initially I just used duck-typing, but this quickly grew out of hand for the myriad of different code signatures I was loading. 

Now, as javascript doesn't have a 'proper' interface setup[^1], I tasked myself with tossing one together.

Really, this is only a type of 'drop in' until javascript have (hopefully) natively supports it, but, for now, it has served me well, and I'd like to release it into the wild, with the hopes that, with a 'proper' mechanism available, interfaces will become a more widespread use-case, and hopefully show the core dev team that this is feature is desired enough to adopt (I'd love to see interface/implements keywords in native JS).


### Execution
*Ok, so how does this little monster work?*

It's not much of a monster really. Which I'm hoping the simplicity of it helps it gain traction on getting adopted. 

It works by passing a class to the global 'interface' method, which associates a symbol to it, and stores this class in a table keyed up by the symbol. It then returns this symbol. This is your reference to the interface internally[^2].

When a class wants to implement the interface, it should do so by extending the result of the the 'Implementable'[^3] function, i.e. `class SomeClass extends Implementable() {}`.

The 'Implementable' function accepts a class as an argument, so a class can still be extended normally, i.e. `class SomeClass extends Implementable(SomeBaseClass) {}`

But, unfortunately, this is where a pit-fall shows itself.

The 'Implementable' function has no way to identify the class that called it, otherwise this would be a more perfect implementation. So, to circumvent this, a static method exists on classes extended from 'Implementable' called 'implements'. This method expects a symbol or class

This is where the symbol returned/exported from 'interface' method would come into play. 

When called, the 'implements' method takes the symbol or class provided, looks up the interface or creates it[^4], then enforces the properties of said interface into the class. 

### How it works
*What is that thing doing to them?*

So now the meat of it. this works by comparing types, prototypes, names, and function lengths on static and non-static members[^5].
For example:

*functions:*
	`function someFunction(a,b,c) {}` is seen as `[function]{name:"someFunction",length: 3}`
*constructors function the same:*
	`class SomeClass {constructor(a,b) {}}` is seen as `[function]{name:"someClass",length:2}`

*objects:*
	`{}` is seen as `[object]{type:"Object"}`
*instances are the same:*
	`new SomeClass()` is seen as `[object]{type:"SomeClass"}`

*primitives are seen as the type reported from `typeof`*
	`true/false` is seen as `[primitive]{type:"boolean"}`
	`1/0/2` is seen as `[primitive]{type:"number"}`
	and so on

When a class implements the interface, the same process is done (collecting all static and non-static members not from the base class), but every member's signature is compared to the interfaces declared signature, and a useful error is thrown if something don't add up.

### Caveats
*I knew there was a catch*

Ok, so this isn't fool-proof, and there are some holes that need to be kept in mind

#### Objects returned from picky constructors/generators

Take, for example, `fs.statSync`. Say you want to ensure that a class has an instance of 'Stats' on it. Well, the interface needs this defined on it somewhere to reference, and `fs.statSync` expects a path to generate one, which is not the job of an interface to know, so it doesn's seem like a 'Stats' object could be enforced.

Since only the names of objects are compared, you could circumvent this behaviour by either making a dummy class[^6]:
```javascript
class SomeInterface {
	constructor() {
		this.fsStatsObject = new (class Stats {})()
	}
}
```
*or* by tricking the constructor/generator into doing it anyway[^7]
```javascript
class SomeInterface {
	constructor() {
		this.fsStatsObject = fs.statSync('.') // '.' directory always exists, so this passes
	}
}

```

### Footnotes

[^1]: ya, ya, typescript, whatever. It's not 'javascript' enough for me

[^2]: this is not needed, as you can always just pass the interface to 'implements' directly, but is there to provide for caching, and as a way to rid of the actual class, preventing it from being extended accidentally.

[^3]: the 'Implementable' function returns a class 'Implementation', which extends either the passed class or an 'EmptyClass', and this 'Implementation' class is what you extend.

[^4]: if a class is passed, the class has an internal reference to it created temporarily, which is deleted after enforcement is done. This lowers the memory footprint but slightly raises execution time

[^5]: not included from the base type (i.e. Object or Array)

[^6]: preferred, works for everything that I've tested against

[^7]: a little undefined behaviour there, and very specific to the situation