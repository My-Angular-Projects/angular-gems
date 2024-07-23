import { Component, inject, signal } from '@angular/core';
import { Todo } from '../../types/todo.interface';
import { User } from '../../types/user.interface';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'gm-todos',
  standalone: true,
  imports: [],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  public readonly pageTitle = 'Team Members and Tasks';

  private readonly todoService = inject(TodoService);

  public readonly todosForMember = signal<Todo[]>([]);
  public readonly members = signal<User[]>([]);

  public readonly errorMessage = this.todoService.errorMessage;

  public onSelectedMember(memberId: EventTarget | null): void {
    //
  }

  public onSelectedTask(taskId: EventTarget | null): void {
    //
  }
}
