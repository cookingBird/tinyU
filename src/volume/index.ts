type CancelFuc = () => void;
interface IArrayVolume {
  push<T>(callback: (param: T) => void, priority: number = 0): CancelFuc;
}

export class ArrayVolume implements IArrayVolume {
  constructor(length: number) {
    this.queue = length === void 0 ? [] : new Array(length);
  }
  push<T>(callback: (param: T) => void,priority?: number): CancelFuc {
    if (priority === 0) {
      this.queue.push(callback);
    }
    if (priority === 1) {
      this.queue.unshift(callback);
    }
    return () =>
      this.queue.splice(
        this.queue.findIndex((fn) => fn === callback),
        1
      );
  }
}
