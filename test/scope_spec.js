import Scope from '../src/scope'

describe('Scope', () => {
  it("can be constructed and used as an object", () => {
    var scope = new Scope()
    scope.propertyA = 1
    expect(scope.propertyA).toBe(1)
  })

  describe('digest', () => {
    let scope

    beforeEach(() =>scope = new Scope())

    it('calls the listener function of a watch on first $digest', () => {
      const watchFn = () => 'wat'
      const listenerFn = jasmine.createSpy()
      scope.$watch(watchFn, listenerFn)
      scope.$digest()
      expect(listenerFn).toHaveBeenCalled()
    })

    it('calls the watch function with the scope as the argument', () => {
      var watchFn = jasmine.createSpy()
      var listenerFn = () => 'nothing'
      scope.$watch(watchFn, listenerFn)
      scope.$digest()
      expect(watchFn).toHaveBeenCalledWith(scope)
    })

    it('calls the listener function when the watched function changes', () => {
      scope.someValue = 'a'
      scope.counter = 0

      scope.$watch((scope) => scope.someValue, (oldVal, newVal, scope) => scope.counter++)

      expect(scope.counter).toBe(0)

      scope.$digest()
      expect(scope.counter).toBe(1)

      scope.$digest()
      expect(scope.counter).toBe(1)

      scope.someValue = 'b'
      expect(scope.counter).toBe(1)

      scope.$digest()
      expect(scope.counter).toBe(2)
    })

    it('calls listener when watch value is first undefined', () => {
      scope.counter = 0

      scope.$watch((scope) => scope.someValue, (newVal, oldVal, scope) => scope.counter++)

      scope.$digest()
      expect(scope.counter).toBe(1)
    })

  })
})
