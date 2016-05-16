import _ from 'lodash'

const sayHelloToSomeone = (to) => _.template("Hello, <%= name %>!")({name: to})

