/*
  此文件拷贝自 element-ui
 */

export function isString (obj) {
  return Object.prototype.toString.call(obj) === '[object String]'
}

export function isObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isHtmlElement (node) {
  return node && node.nodeType === Node.ELEMENT_NODE
}

export const isFunction = (functionToCheck) => {
  const getType = {}
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
}

export const isUndefined = (val) => {
  return val === undefined
}

export const isDefined = (val) => {
  return val !== undefined && val !== null
}
