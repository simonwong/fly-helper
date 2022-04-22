import assert from 'assert'
import { toUnicodeAt, toUnicode } from '../src/toUnicode'

describe('type:', () => {
  /**
   * toUnicodeAt
   */
  describe('toUnicodeAt', () => {
    test(' "ABC" => \\u0041 ', () => {
      assert.strictEqual(toUnicodeAt('ABC'), '\\u0041')
    })
    test(' "ABC", 1 => \\u0042 ', () => {
      assert.strictEqual(toUnicodeAt('ABC', 1), '\\u0042')
    })
  })

  /**
   * toUnicode
   */
  describe('toUnicode', () => {
    test(' "ABC" => \\u0041\\u0042\\u0043 ', () => {
      assert.strictEqual(toUnicode('ABC'), '\\u0041\\u0042\\u0043')
    })

    test(' "" => "" ', () => {
      assert.strictEqual(toUnicode(''), '')
    })
  })
})
