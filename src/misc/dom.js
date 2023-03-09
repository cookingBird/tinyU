/**
 *
 * @param {string} id 目标元素id
 * @param {?function} judgeCb 确定元素获取成功的judge函数
 * @param {?'requestAnimationFrame' | 'setTimeout'} type 轮询函数类型
 * @returns {promise}
 */
export function requestDom(
  id,
  judgeCb = (el) => Boolean(el),
  type = 'requestAnimationFrame'
) {
  function getDom(id, callback, type) {
    if (document && window && window.requestAnimationFrame) {
      const el = document.getElementById(id);

      if (!judgeCb(el)) {
        if (type === 'requestAnimationFrame') {
          requestAnimationFrame(() => {
            getDom(id, callback, type);
          });
        }
        if (type === 'setTimeout') {
          setTimeout(() => {
            getDom(id, callback, type);
          });
        }
      } else {
        return callback(el);
      }
    } else {
      throw Error("browser don't support");
    }
  }

  let resolver;
  return new Promise((resolve) => {
    resolver = resolve;
    getDom(
      id,
      (el) => {
        setTimeout(() => {
          resolver(el);
        });
      },
      type
    );
  });
}
