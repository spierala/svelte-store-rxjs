import { Component } from '@angular/core';
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

a.set(4);

const multiplied = derived(a, a => a * 2);
multiplied.subscribe(multiplied => console.log('multiplied', multiplied))

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
