/**
 * @description 获取URL search参数
 * @param {Location} location
 * @returns {object}
 */
export function getParams(location: Location): Record<string, any> {
  const search = location.search.slice(1);
  const result = {};
  search
    .split('&')
    .map((p) => p.split('='))
    .forEach((item) => {
      result[item[0]] = item[1];
    });
  return result;
}
