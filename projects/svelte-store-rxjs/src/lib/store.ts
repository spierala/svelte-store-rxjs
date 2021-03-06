import { BehaviorSubject, combineLatest, EMPTY, Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";

// Svelte store github: https://github.com/sveltejs/svelte/blob/master/src/runtime/store/index.ts
// Svelte store API docs: https://svelte.dev/docs#svelte_store

type Updater<T> = (value: T) => T;

export interface IWritable<T> extends Observable<T> {
  // Extend Observable instead of Readable!
  set(value: T): void;
  update(updater: Updater<T>): void;
}

// Based on "SvelteSubject" https://github.com/ReactiveX/rxjs/issues/4740#issuecomment-490601347
export class Writable<T> extends BehaviorSubject<T> implements IWritable<T> {
  constructor(initialValue: T) {
    super(initialValue);
  }

  set(value: T): void {
    if (value !== this.getValue()) {
      super.next(value);
    }
  }

  update(fn: Updater<T>): void {
    this.set(fn(this.getValue()));
  }

  lift<R>(operator): Writable<R> {
    const result = new Writable<R>(operator);
    result.operator = operator;
    result.source = this;
    return result;
  }
}

export function readable<T>(initialState: T): Observable<T> {
  // Observable is our Readable!
  const stateSource: Writable<T> = new Writable(initialState);
  return stateSource.asObservable();
}

export function writable<T>(initialState: T): Writable<T> {
  const stateSource: Writable<T> = new Writable(initialState);
  return stateSource;
}

type Stores = Observable<any> | [Observable<any>, ...Array<Observable<any>>];

export function derived<T>(
  stores: Stores,
  fn: Function,
  initial_value?: T // TODO
): Observable<T> {
  const single = !Array.isArray(stores);
  const storesArray: Array<Observable<any>> = single
    ? [stores as Observable<any>]
    : (stores as Array<Observable<any>>);

  return combineLatest(storesArray).pipe(
    distinctUntilChanged((prev, curr) =>
      prev.every((prevItem, i) => prevItem === curr[i])
    ),
    map(values => fn(single ? values[0] : values))
  );
}
