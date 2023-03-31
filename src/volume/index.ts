export type IIGenericCallback<P1, P2, R> = (param1: P1, parma2: P2) => R;
export type IGenericCallback<P, R> = (param: P) => R;

export type CancelFuc = () => void;

export type ChainCallback<T> = IGenericCallback<T, T>;

interface IArrayVolume<T> {
  push(callback: ChainCallback<T>, priority?: number): CancelFuc;
}

export class ArrayVolume<T extends Record<string, any>> implements IArrayVolume<T> {
  protected queue: Array<ChainCallback<T>>;
  constructor() {
    this.queue = [];
  }
  push(callback: ChainCallback<T>, priority: number = 1): CancelFuc {
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
