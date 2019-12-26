import assert from 'assert'
import { hello } from '../src/hello'

describe('validate:', () => {
  /**
   * hello
   */
  describe('hello', () => {
    test(' return hello rollup ', () => {
      assert.strictEqual(hello('rollup'), 'hello rollup')
    })
  })
})
