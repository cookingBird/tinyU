const _toString = Object.prototype.toString;
const typeMap = {
  number: '[object Number]',
  string: '[object String]',
  boolean: '[object Boolean]',
  undefined: '[object Undefined]',
  null: '[object Null]',
  object: '[object Object]',
  body: '[object HTMLBodyElement]',
  element: /\[object HTMLw+Element\]/,
  regexp: '[object RegExp]',
  function: /\[object .*Function\]/,
  symbol: '[object Symbol]',
};
/**
 * @param {*} t 待判断元素
 * @returns {boolean}
 */
export function isString(t) {
  return _toString.call(t) === typeMap.string;
}

/**
 * @param {*} t 待判断元素
 * @returns {boolean}
 */
export function isNumber(t) {
  return _toString.call(t) === typeMap.number;
}

/**
 * @param {*} t 待判断元素
 * @returns {boolean}
 */
export function isBoolean(t) {
  return _toString.call(t) === typeMap.boolean;
}

/**
 * @param {*} t 待判断元素
 * @returns {boolean}
 */
export function isRegExp(t) {
  return _toString.call(t) === typeMap.regexp;
}

/**
 * @param {*} t 待判断元素
 * @returns {boolean}
 */
export function isUndefined(t) {
  return _toString.call(t) === typeMap.undefined;
}

/**
 * @param {*} t 待判断元素
 * @returns {boolean}
 */
export function isNull(t) {
  return _toString.call(t) === typeMap.null;
}

/**
 * @param {*} t 待判断元素
 * @returns {boolean}
 */
export function isObject(t) {
  return _toString.call(t) === typeMap.object;
}

/**
 * @param {*} t 待判断元素
 * @returns {boolean}
 */
export function isArray(t) {
  return Array.isArray(t);
}

/**
 * @param {*} t 待判断元素
 * @returns {boolean}
 */
export function isBody(t) {
  return _toString.call(t) === typeMap.body;
}

/**
 * @param {*} t 待判断元素
 * @returns {boolean}
 */
export function isFunction(t) {
  return typeMap.function.test(_toString.call(t));
}

/**
 * @param {*} t 待判断元素
 * @returns {boolean}
 */
export function isElement(t) {
  return typeMap.element.test(_toString.call(t));
}

/**
 * @param {*} t 待判断元素
 * @returns {*} '[object *]' like
 */
export function typeIs(t) {
  return _toString.call(t);
}

/**
 * @param {*} t 待判断元素
 * @returns {boolean}
 */
export function isSymbol(t) {
  return _toString.call(t) === typeMap.symbol;
}
