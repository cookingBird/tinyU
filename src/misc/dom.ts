type TJudgeCallback = (el: HTMLElement | null) => boolean;
type TTimer = 'requestAnimationFrame' | 'setTimeout';

/**
 * @description 获取一个dom节点
 * @param id
 * @param judgeCb
 * @param type
 * @returns Promise<HTMLElement> 获取到的节点
 */
export function requestDom(
  id: string | (() => unknown),
  judgeCb: TJudgeCallback = (el) => Boolean(el),
  type: TTimer = 'requestAnimationFrame'
): Promise<HTMLElement> {
  return new Promise((resolve) => {
    getDom(id, judgeCb, resolve, type);
  });
}

function getDom(
  id: string | (() => unknown),
  judgeCb: TJudgeCallback,
  callback: (el: HTMLElement) => void,
  type: TTimer
) {
  if (document && window) {
    let el;
    if (typeof id === 'string') {
      el = document.getElementById(id);
    } else {
      el = id();
    }
    if (!judgeCb(el)) {
      if (type === 'requestAnimationFrame') {
        requestAnimationFrame(() => {
          getDom(id, judgeCb, callback, type);
        });
      }
      if (type === 'setTimeout') {
        setTimeout(() => {
          getDom(id, judgeCb, callback, type);
        });
      }
    } else {
      return callback(el);
    }
  } else {
    throw Error("browser don't support");
  }
}
