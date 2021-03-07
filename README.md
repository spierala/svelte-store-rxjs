[![NPM](https://img.shields.io/npm/v/svelte-store-rxjs)](https://www.npmjs.com/package/svelte-store-rxjs)
[![Tests](https://github.com/spierala/svelte-store-rxjs/actions/workflows/nodejs.yml/badge.svg)](https://github.com/spierala/svelte-store-rxjs/actions/workflows/nodejs.yml)

# Svelte Store RxJS

**Svelte Store RxJS** provides [Svelte Stores](https://svelte.dev/docs#svelte_store) (**readable**, **writable**, **derived**) as [RxJS](https://github.com/ReactiveX/rxjs) Observables.

| WARNING: This project is still experimental! Do not use in production! |
| --- |

Example:

```ts
import { derived, readable, Writable, writable } from 'svelte-store-rxjs';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Writable
const a: Writable<number> = writable<number>(1);
a.subscribe(a => console.log('writable', a));
a.set(2);
a.update(state => state + 1);

// Readable
const b: Observable<number> = readable<number>(12);
b.subscribe(b => console.log('readable', b));

// Derived
const abSummed: Observable<number> = derived([a, b], ([a, b]) => {
  return a + b;
});
abSummed.subscribe(abSummed => console.log('summed', abSummed));

// All stores are true RxJS Observables, we can have RxJS fun with more than 100 RxJS operators :)
abSummed.pipe(
  // Filter out non-even numbers
  filter((num: number) => num % 2 === 0)
).subscribe(sum => console.log('RxJS pipe result', sum))
```
Readable, writable, derived are true RxJS Observables.

## RxJS
- `writable()` returns a `Writable` instance. `Writable` extends RxJS BehaviorSubject.
- `readable()` and `derived()` return a RxJS Observable

## References
- [Svelte store github](https://github.com/sveltejs/svelte/blob/master/src/runtime/store/index.ts)
- [Svelte store API docs](https://svelte.dev/docs#svelte_store)
- [RxJS Github issue about "SvelteSubject"](https://github.com/ReactiveX/rxjs/issues/4740#issuecomment-490601347)
