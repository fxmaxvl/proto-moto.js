[![npm version](https://img.shields.io/npm/v/proto-moto.js.svg?style=flat-square)](https://www.npmjs.com/package/proto-moto.js)

**proto-moto.js** — JavaScript (ES2015) library based on prototypes inheritance 
and composition for easy work with objects without ugly constructors.

#### Install
**proto-moto.js** can be [installed via npm](https://www.npmjs.com/package/proto-moto.js)

```shell
npm install proto-moto.js
```
This assumes that you’re using npm package manager with a module bundler
(Browserify, Webpack etc.).

If you don't yet use a modern module bundler (or don't want use), you can use 
a pre-built version from */dist/* folder. And when you include the library 
to your page, it will be available as an *protoMotoLib* in global scope.

#### Examples:
You can use protoMoto function to configure and
creating a builder.

```javascript
import { protoMoto } from 'proto-moto';

const yourProtoObject = {
    someProp: 'someProp',
    someMethod: () => 'someMethod'
};

const builder = protoMoto()
    .thisIsMyProto(yourProtoObject)
    .thisIsMyImplementation({
        implementedProp: 'implementedProp'
    })
    .thisIsMyInitializer((options) => {
        //you can put here some initialize logic
        //and return (or not) object that will be mixed into implementation
        
        return {
            preinitializedProp: 'preinitializedProp'
        };
    })
    .getMeBuilder();
    
//use of builder is:
//-- for create objects
const newObject = builder();

//that have yourProtoObject's props and methods (if they not shadowed by your implementation)
newObject().someProp // 'someProp'
newObject().someMethod() // 'someMethod'

//and implementations's props
newObject().implementedProp // 'implementedProp'

//and initialized props
newObject().preinitializedProp // 'preinitializedProp'

//-- for ensurence of proto
//you can always check if this object creates be this proto
builder.ensureProto(newObject) // true
builder.ensureProto({some: 'other'}) // false
```

Or use separately functions createFromProto, ensureProto 
for your own needs.
```javascript
import { createFromProto, ensureProto } from 'proto-moto';

//create new object
const newObject = createFromProto(/* your proto */)(/* your implementation */);

//ensure object's proto
ensureProto(/* your proto */)(newObject); // true or false
```