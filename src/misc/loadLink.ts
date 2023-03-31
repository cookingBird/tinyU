/**
 * 动态加载js文件
 * @param hrefUrl 文件地址
 * @returns Promise
 */
export function loadCss(hrefUrl: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    // 判断当前css是否已经加载过
    const linkNodes: string[] = [].slice
      .call(document.querySelectorAll('link'))
      .map((item: HTMLLinkElement) => item.href);
    if (linkNodes.includes(hrefUrl)) return resolve(true);

    const link: HTMLLinkElement = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = hrefUrl;
    document.head.appendChild(link);
    link.onload = () => {
      resolve(true);
    };
    link.onerror = (err) => {
      reject(err);
    };
  });
}

/**
 * 动态加载js文件
 * @param srcUrl 文件地址
 * @returns Promise
 */
export function loadJs(srcUrl: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    // 判断当前js是否已经加载过
    const scriptNodes: string[] = [].slice
      .call(document.querySelectorAll('script'))
      .map((item: HTMLScriptElement) => item.src);
    if (scriptNodes.includes(srcUrl)) return resolve(true);

    const script: HTMLScriptElement = document.createElement('script');
    script.type = 'text/javascript';
    script.src = srcUrl;
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = (err) => {
      reject(err);
    };
  });
}

/**
 * 动态加载多个文件
 * @param jsList js文件地址列表
 * @param cssList css文件地址列表
 * @returns Promise
 */
export function asyncLoad(jsList: string[], cssList: string[]): Promise<any> {
  const jsPromiseList: Promise<any>[] = [];
  const cssPromiseList: Promise<any>[] = [];
  jsList.forEach((item) => {
    jsPromiseList.push(loadJs(item));
  });
  cssList.forEach((item) => {
    cssPromiseList.push(loadCss(item));
  });
  return Promise.all([...cssPromiseList, ...jsPromiseList]);
}
