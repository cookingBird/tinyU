/**
 * @description 获取URL search参数
 * @param {Location} location
 * @returns {object}
 */
function getParams (location) {
  const search = location.search.slice(1)
  const result = {}
  search
    .split('&')
    .map(p => p.split('='))
    .forEach(item => {
      result[item[0]] = item[1]
    })
  return result
}
