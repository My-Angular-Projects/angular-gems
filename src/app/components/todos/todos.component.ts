import { Component, signal } from '@angular/core';
import { Todo } from '../../types/todo.interface';
import { User } from '../../types/user.interface';

@Component({
  selector: 'gm-todos',
  standalone: true,
  imports: [],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  public readonly pageTitle = 'Team Members and Tasks';

  public readonly todosForMember = signal<Todo[]>([]);
  public readonly members = signal<User[]>([]);

  public onSelectedMember(memberId: EventTarget | null): void {
    //
  }

  public onSelectedTask(taskId: EventTarget | null): void {
    //
  }
}
