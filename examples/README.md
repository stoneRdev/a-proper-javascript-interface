## Examples <a name="examples"></a>

**Don't forget to `require('a-proper-interface')` at the top of your application!**


[Example 1](#example-1)

[Example 2](#example-2)

[Example 3](#example-3)

[Example 4](#example-4)



### Example 1
#### Basic Usage With Symbols <a name="example1"></a>


This example shows basic usage with symbols

[Interface](/examples/1a.js)

[Implementing Class](/examples/1b.js)



### Example 2
#### Basic Usage without Symbols <a name="example2"></a>


This example shows basic usage without symbols

[Interface](/examples/1a.js)

[Implementing Class](/examples/1b.js)



### Example 3
#### Getting Picky Constructors/Generators to play nice <a name="example3"></a>

Seeing as how some constructors/generators require some input to get an object out of them, and an interface has no business knowing how this is done, this example shows how to enforce objects returned from constructors/generators thsat require input. *Note: this requires knowing in advance what type of object you will be needing, but seeing as how that's somewhat the point of an interface, I'll leave that up to the end developers to figure out*

[Interface](/examples/3a.js)



### Example 4
#### Dynamic Interfaces <a name="example4"></a>

There are some tricks I found to making dynamic types on interfaces (which I found using the method in [Example 3](/examples/#example3))

[Interface](/examples/4a.js)