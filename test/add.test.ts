import assert from 'assert'
import { add } from '../src/add'

describe('validate:', () => {
  /**
   * add
   */
  describe('add', () => {
    test(' return 2 ', () => {
      assert.strictEqual(add(), 2)
    })
  })
})
