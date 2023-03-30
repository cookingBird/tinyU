/**
 * 动态加载js文件
 * @param {*} hrefUrl 文件地址
 * @returns Promise
 */
export function loadCssUrl(hrefUrl) {
  return new Promise((resolve, reject) => {
    // 判断当前css是否已经加载过
    const linkNodes = [].slice
      .call(document.querySelectorAll('link'))
      .map((item) => item.href);
    if (linkNodes.includes(hrefUrl)) return resolve();

    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = hrefUrl;
    document.head.appendChild(link);
    link.onload = () => {
      resolve();
    };
    link.onerror = (err) => {
      reject(err);
    };
  });
}

/**
 * 动态加载js文件
 * @param {*} srcUrl 文件地址
 * @returns Promise
 */
export function loadJs(srcUrl) {
  return new Promise((resolve, reject) => {
    // 判断当前js是否已经加载过
    const scriptNodes = [].slice
      .call(document.querySelectorAll('script'))
      .map((item) => item.src);
    if (scriptNodes.includes(srcUrl)) return resolve();

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = srcUrl;
    document.body.appendChild(script);
    script.onload = () => {
      resolve();
    };
    script.onerror = (err) => {
      reject(err);
    };
  });
}

/**
 * 动态加载多个文件
 * @param {*} jsList js文件地址列表
 * @param {*} cssList css文件地址列表
 * @returns Promise
 */
export function asyncLoad(jsList, cssList) {
  return new Promise((resolve, reject) => {
    const jsPromiseList = [];
    const cssPromiseList = [];
    jsList.forEach((item) => {
      jsPromiseList.push(loadJs(item));
    });
    cssList.forEach((item) => {
      cssPromiseList.push(loadCss(item));
    });
    Promise.all([...cssPromiseList, ...jsPromiseList])
      .then((_) => resolve())
      .catch(reject);
  });
}
