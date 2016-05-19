import { forEach } from 'lodash'

export default class Scope {
  constructor() {
    this.$$watchers = []
  }
  $watch(watchFn, listenerFn) {
    const watcher = { watchFn, listenerFn, last: Symbol() }
    this.$$watchers.push(watcher)
  }
  $digest() {
    forEach(this.$$watchers, watcher => {
      const newVal = watcher.watchFn(this)
      const oldVal = watcher.last
      if (newVal !== oldVal) {
        watcher.last = newVal
        watcher.listenerFn(newVal, oldVal, this)
      }
    })
  }
}
