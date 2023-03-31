import { ArrayVolume, CancelFuc } from '../volume';
import type {  ChainCallback } from '../volume';

interface IRunner<T> {
  run(param: T): T;
}

export class ChainRunner<T extends Record<any, any>>
  extends ArrayVolume<T>
  implements IRunner<T>
{
  constructor() {
    super();
  }
  push(callback: ChainCallback<T>, priority?: number): CancelFuc {
    return super.push(callback, priority);
  }
  run(param: T): T {
    return this.queue.reduce((acc, cur) => {
      return cur(acc);
    }, param);
  }
}
