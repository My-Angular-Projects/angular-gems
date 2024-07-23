import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, delay, map, Observable, of, takeUntil } from 'rxjs';
import { Todo } from '../types/todo.interface';
import { errorHandler } from '../helpers/error-handler.helper';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly url = 'https://jsonplaceholder.typicode.com/todos';

  public errorMessage = signal<string>('');
  public todos = signal<Todo[]>([]);

  public setUserId(userId: number): void {
    // Clear the todos from the prior selection
    this.todos.set([]);

    this.getTodos(userId)
      .pipe(delay(2000), takeUntilDestroyed(this.destroyRef))
      .subscribe((todos: Todo[]) => this.todos.set(todos));
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
