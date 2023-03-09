import { ArrayVolume } from '../volume';
export class ChainRunner extends ArrayVolume {
  constructor() {
    super();
  }
  /**
   * 加入一个回调函数到执行队列
   * @param { Function } callback 回调函数
   * @param { number } priority 优先级
   * @returns { Function } remove函数 从队列中移除回调
   */
  push(callback) {
    return super.push(callback, 1);
  }
  /**
   * 链式执行回调队列中的回调函数
   * @param  {*} result 执行参数
   */
  run(result) {
    return this.queue.reduce((cur, pre) => {
      return cur(pre);
    }, result);
  }
}
