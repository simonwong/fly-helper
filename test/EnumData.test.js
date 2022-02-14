import assert from 'assert'
import { EnumData } from '../src'

describe('EnumData:', () => {
  /**
   * EnumData base function
   */
  describe('EnumData base function', () => {
    const COLOR_DATA = EnumData([
      ['RED', 1, '红色'],
      ['BLUE', 2, '蓝色'],
      ['GREEN', 3, '绿色'],
      ['YELLOW', 4, '黄色'],
    ])

    test(' match color key / value ', () => {
      assert.strictEqual(COLOR_DATA.RED, 1)
      assert.strictEqual(COLOR_DATA.YELLOW, 4)
      assert.strictEqual(COLOR_DATA['2'], '蓝色')
      assert.strictEqual(COLOR_DATA['3'], '绿色')
    })

    test(' match color undefined key / value ', () => {
      assert.strictEqual(COLOR_DATA.BLACK, undefined)
      assert.strictEqual(COLOR_DATA['红色'], undefined)
      assert.strictEqual(COLOR_DATA['5'], undefined)
    })
  })

  describe('EnumData 0 1', () => {
    const ENABLE_DISABLE = EnumData([
      ['ENABLE', 1, '启用'],
      ['DISABLE', 0, '停用'],
    ])

    test(' enable disable ', () => {
      assert.strictEqual(ENABLE_DISABLE.DISABLE, 0)
      assert.strictEqual(ENABLE_DISABLE['0'], '停用')
      assert.strictEqual(ENABLE_DISABLE.ENABLE, 1)
      assert.strictEqual(ENABLE_DISABLE['1'], '启用')
    })
  })

  /**
   * EnumData array function
   */
  describe('EnumData array function', () => {
    const STATUS_MAP = EnumData([
      ['PAY', 10, '待支付'],
      ['BALANCE', 20, '待回款'],
      ['REVIEW', 30, '待审核'],
    ])

    test(' match array prototype function ', () => {
      assert.strictEqual(
        STATUS_MAP.forEach.constructor,
        Array.prototype.forEach.constructor,
      )
      assert.strictEqual(
        STATUS_MAP.map.constructor,
        Array.prototype.map.constructor,
      )

      assert.strictEqual(STATUS_MAP.length, 3)

      assert.strictEqual(
        STATUS_MAP.map(([, , text]) => text).join(','),
        '待支付,待回款,待审核',
      )
      assert.strictEqual(
        STATUS_MAP.reduce((prevText, [key]) => `${prevText}${key},`, ''),
        'PAY,BALANCE,REVIEW,',
      )
    })

    test(' match in EnumData', () => {
      assert.strictEqual('PAY' in STATUS_MAP, false)
      assert.strictEqual(20 in STATUS_MAP, false)
      assert.strictEqual('待审核' in STATUS_MAP, false)
      assert.strictEqual('every' in STATUS_MAP, true)
      assert.strictEqual(Symbol.iterator in STATUS_MAP, true)
    })
  })
  /**
   * EnumData object function
   */
  describe('EnumData object function', () => {
    const originData = [
      ['A', 0, '大A'],
      ['B', 1, '大B'],
    ]
    const ABC_MAP = EnumData(originData)

    test(' match object prototype function ', () => {
      assert.strictEqual(
        ABC_MAP.toString.constructor,
        Object.prototype.toString.constructor,
      )
      assert.strictEqual(
        ABC_MAP.hasOwnProperty.constructor,
        Object.prototype.hasOwnProperty.constructor,
      )
    })

    test(' run object function ', () => {
      assert.strictEqual(ABC_MAP.toString(), originData.toString())
      assert.strictEqual(ABC_MAP.valueOf(), originData.valueOf())
    })
  })

  /**
   * EnumData conflict
   */
  describe('EnumData conflict', () => {
    // 字段冲突、方法名冲突
    const STATUS_MAP = EnumData([
      ['PAY', 10, '待支付'],
      ['PAYED', 'PAY', '已支付'],
      ['forEach', 30, '每一个'],
    ])

    test(' fields reflect ', () => {
      assert.strictEqual(typeof STATUS_MAP.forEach === 'function', false)
      assert.strictEqual(STATUS_MAP.forEach === 30, true)
      assert.strictEqual(STATUS_MAP.PAY === '已支付', false)
      assert.strictEqual(STATUS_MAP.PAY === 10, true)
    })
  })

  /**
   * EnumData Set
   */
  describe('EnumData Set', () => {
    // 字段冲突、方法名冲突
    const STATUS_MAP = EnumData([
      ['YES', 1, '是'],
      ['NO', 0, '否'],
    ])

    test(' cannot set value ', () => {
      assert.strictEqual(STATUS_MAP.YES === 1, true)
      expect(() => {
        STATUS_MAP.YES = '2'
      }).toThrowError(`Don't allow assignment to constant variable`)
      assert.strictEqual(STATUS_MAP.YES === 1, true)
    })
  })
})
