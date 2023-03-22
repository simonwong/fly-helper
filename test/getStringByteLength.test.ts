import assert from 'assert'
import { TextEncoder } from 'util'
import { getStringByteLength } from '../src/getStringByteLength'

global.TextEncoder = TextEncoder

describe('getStringByteLength:', () => {
  /**
   * number and letter
   */
  describe('number and letter', () => {
    test(' "123" => 3 ', () => {
      assert.strictEqual(getStringByteLength('123'), 3)
    })
    test(' "ABC" => 3 ', () => {
      assert.strictEqual(getStringByteLength('ABC'), 3)
    })
  })

  /**
   * Chinese
   */
  describe('Chinese', () => {
    test(' "哈" => 3 ', () => {
      assert.strictEqual(getStringByteLength('哈'), 3)
    })

    test(' "阿斯顿" => 9 ', () => {
      assert.strictEqual(getStringByteLength('阿斯顿'), 9)
    })
  })

  /**
   * Emoji
   */
  describe('Emoji', () => {
    test(' "😂" => 4 ', () => {
      assert.strictEqual(getStringByteLength('😂'), 4)
    })

    test(' "👨‍👩‍👦" => 18 ', () => {
      assert.strictEqual(getStringByteLength('👨‍👩‍👦'), 18)
    })
  })
})
