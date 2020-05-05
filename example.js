require('./index')

class Interface {
	static staticFunction1(a){}
	static staticFunction2(a,b){}
	function1(a) {}
	function2(a,b) {}
	function3(a,b,c) {}
	constructor(a,b,c) {
		this.member1 = {}
		this.member2 = []
		this.member3 = ""
		this.member4 = 0
		this.member5 = false
		this.member6 = (a,b,c,d) => {}
	}
}
Interface.staticMember = 0
Interface.staticMember2 = ""
Interface.staticMember3 = {}
Interface.staticMember4 = []
Interface = interface(Interface)



class Implementing extends Implementable() {
	static staticFunction1(a){console.log('static function 1')}
	static staticFunction2(a,b){console.log('static function 2')}
	function1(a) {console.log('function 1')}
	function2(a,b) {console.log('function 2')}
	function3(a,b,c) {console.log('function 3')}
	constructor(a,b,c) {
		super()
		this.member1 = {test:true}
		this.member2 = [1,2,3,4,false]
		this.member3 = "testing 1 2 3"
		this.member4 = 420
		this.member5 = true
		this.member6 = (a,b,c,d) => {console.log('member function 6')}
	}
}
Implementing.staticMember = 69
Implementing.staticMember2 = "statically"
Implementing.staticMember3 = {box:"outside"}
Implementing.staticMember4 = ['a','b',3]

Implementing[implements](Interface,[1,2,3])	