import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Todo } from '../types/todo.interface';
import { errorHandler } from '../helpers/error-handler.helper';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://jsonplaceholder.typicode.com/todos';

  public errorMessage = signal<string>('');

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
