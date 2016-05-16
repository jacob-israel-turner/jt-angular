import Scope from '../src/scope'

describe('Scope', function () {
  it("can be constructed and used as an object", function() {
    var scope = new Scope()
    scope.propertyA = 1

    expect(scope.propertyA).toBe(1)
  })
})
