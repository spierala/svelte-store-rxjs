import { Component } from '@angular/core';
import { derived, readable, writable } from 'svelte-store-rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

const a = writable<number>(5);
a.subscribe(a => console.log({a}));
a.set(6);
a.update(state => state + 1);

const b = readable<number>(123);
b.subscribe(b => console.log({b}));

const aMultiplied = derived(a, ([a]) => {
  return a * 2;
});
aMultiplied.subscribe(aMultiplied => console.log({aMultiplied}));

const abSummed = derived([a, b], ([a, b]) => {
  console.log('calc sum');
  return a + b;
});
abSummed.subscribe(abSummed => console.log({abSummed}));

a.pipe(
  withLatestFrom(b),
  map(([a, b]) => a + b)
).subscribe(console.log)

a.set(666)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
