type EnumDataItem = readonly [string, number | string, string]
/** @beta */
export type EnumDataList = readonly EnumDataItem[]
type EnumDataRecord = Record<PropertyKey, any>

type TransformArrayToObject<
  Tuple extends EnumDataList,
  Result extends EnumDataRecord = {},
> = Tuple extends []
  ? Result // last call
  : Tuple extends readonly [infer Head, ...infer Tail]
  ? Head extends readonly [infer Key, infer Value, infer Text]
    ? Tail extends EnumDataList
      ? Value extends PropertyKey
        ? Key extends PropertyKey
          ? TransformArrayToObject<
              Tail,
              Result & Record<Value, Text> & Record<Key, Value>
            > // recursive call
          : Result
        : Result
      : Result
    : Result
  : Result

type ReadonlyMergedRecord<T> = T extends EnumDataRecord
  ? {
      readonly [K in keyof T]: T[K]
    }
  : never

/** @beta */
export type EnumDataResult<TD extends EnumDataList> = ReadonlyMergedRecord<
  TransformArrayToObject<TD>
> &
  Array<TD[number]>

/**
 * 常量枚举类，传入多组 [key, value, text] 数据
 * 就可以通过 value 获得 text，通过 key 获得 value
 * 无法通过 index 来拿 某一组数据，可以使用迭代器，length 等
 *
 * @param data - 元数据
 * @returns data
 *
 * @example
 * ```ts
 * const YES_OR_NO = EnumData([
 *   ['YES', 1, '是'],
 *   ['NO', 0, '否'],
 * ])
 * console.log(YES_OR_NO.YES === 1) // true
 * console.log(YES_OR_NO['1']) // 是
 * console.log('YES' in YES_OR_NO) // false
 * console.log('forEach' in YES_OR_NO) // true
 * YES_OR_NO.map([key, value, text] => ({
 *   key,
 *   value,
 *   text,
 * }))
 * ```
 *
 * @beta
 */
export function EnumData<T extends EnumDataList>(data: T) {
  const keyMap = {}
  const valueMap = {}
  data.forEach(([key, value, text]) => {
    keyMap[key] = value
    valueMap[value] = text
  })

  const ans = new Proxy(data, {
    get(target, propKey) {
      if (keyMap.hasOwnProperty(propKey)) {
        return keyMap[propKey]
      }
      if (valueMap.hasOwnProperty(propKey)) {
        return valueMap[propKey]
      }
      // 除了可以使用 Array 的方法外，也应该允许使用 Object 上的方法
      // 用 in 可以获取到继承对象的属性，而 hasOwnProperty 不能
      if (propKey in Array.prototype) {
        if (typeof Array.prototype[propKey] === 'function') {
          return Array.prototype[propKey].bind(target)
        }
        return target[propKey]
      }
      return undefined
    },
    set() {
      throw TypeError(`Don't allow assignment to constant variable`)
    },
  })
  return ans as unknown as EnumDataResult<T>
}
