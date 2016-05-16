import _ from 'lodash'
import poo from './temp'

const sayHelloToSomeone = (to) => _.template("Hello, <%= name %>!")({name: to})

