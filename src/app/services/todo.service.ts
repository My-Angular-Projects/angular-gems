import { HttpClient } from '@angular/common/http';
import { DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Todo } from '../types';
import { errorHandler } from '../helpers/error-handler.helper';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly url = 'https://jsonplaceholder.typicode.com/todos';
  private selectedMemberId = signal<number | undefined>(undefined);

  public errorMessage = signal<string>('');
  public todos = signal<Todo[]>([]);

  private effect = effect(() => {
    const memberId = this.selectedMemberId();
    if (memberId) {
      this.getTodos(memberId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((todos: Todo[]) => this.todos.set(todos));
    }
  });

  public setMemberId(memberId: number): void {
    this.todos.set([]);
    this.selectedMemberId.set(memberId);
  }

  private getTodos(userId: number): Observable<Todo[]> {
    const url = `${this.url}?userId=${userId}`;

    return this.http.get<Todo[]>(url).pipe(
      map((todos: Todo[]) =>
        todos.map((todo: Todo) =>
          todo.title.length > 20
            ? { ...todo, title: todo.title.substring(0, 20) }
            : todo
        )
      ),
      catchError((error) => {
        this.errorMessage.set(errorHandler(error));

        return of([]);
      })
    );
  }
}
