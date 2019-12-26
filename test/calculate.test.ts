import assert from 'assert'
import { calculateOneAddOne } from '../src/calculate'

describe('validate:', () => {
  /**
   * calculateOneAddOne
   */
  describe('calculateOneAddOne', () => {
    test(' return 2 ', () => {
      assert.strictEqual(calculateOneAddOne(), 2)
    })
  })
})
