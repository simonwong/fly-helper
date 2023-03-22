/**
 * 获取字符串的 UTF-8 子节长度
 *
 * @param str - 字符串
 * @param index - unicode 的下标
 * @returns 字节长度
 *
 * @example
 * ```ts
 * getStringByteLength(‘ABC’) // 3
 * getStringByteLength(‘哈喽’) // 6
 * ```
 * @see [Stack Overflow: String length in bytes in JavaScript](https://stackoverflow.com/questions/5515869/string-length-in-bytes-in-javascript)
 * @beta
 */
export const getStringByteLength = (str: string) =>
  new TextEncoder().encode(str).length
