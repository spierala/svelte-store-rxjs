# Svelte Store Rxjs

 Svelte Stores (readable, writable, derived) reimplemented with RxJS.
 
Example:

```ts
import { derived, readable, writable } from 'svelte-store-rxjs';

// Writable
const a = writable<number>(5);
a.subscribe(a => console.log({a}));
a.set(6);
a.update(state => state + 1);

// Readable
const b = readable<number>(123);
b.subscribe(b => console.log({b}));


// Derived
const aMultiplied = derived(a, ([a]) => {
  return a * 2;
});
aMultiplied.subscribe(aMultiplied => console.log({aMultiplied}));

const abSummed = derived([a, b], ([a, b]) => {
  console.log('calc sum');
  return a + b;
});
abSummed.subscribe(abSummed => console.log({abSummed}));

a.set(1000);
```
Readable, writable, derived are true RxJS Observables.
