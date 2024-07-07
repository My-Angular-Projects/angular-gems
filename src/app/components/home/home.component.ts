import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { fromEvent, map, merge, scan, Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'gm-home',
  standalone: true,
  imports: [MatButton, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly reset$ = new Subject<void>();

  // https://www.learnrxjs.io/learn-rxjs/operators/combination/merge
  public readonly clicks$ = merge(
    fromEvent<PointerEvent>(document, 'click').pipe(
      map((event: PointerEvent) => this.accumulatorHandlerFn(event))
    ),
    this.reset$.pipe(map(() => this.resetHandlerFn()))
  ).pipe(scan((state: PointerEvent[], cb) => cb(state), <PointerEvent[]>[]));

  public clickHandler(event: MouseEvent): void {
    event.stopPropagation();
    this.reset$.next();
  }

  private accumulatorHandlerFn =
    (event: PointerEvent) => (state: PointerEvent[]) => [...state, event];

  private resetHandlerFn = () => (state: PointerEvent[]) => [];
}
