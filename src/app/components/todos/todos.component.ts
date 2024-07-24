import { Component, inject } from '@angular/core';

import { TodoService, UserService } from '../../services';

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
  private readonly userService = inject(UserService);

  public readonly todosForMember = this.todoService.todos;
  public readonly errorMessage = this.todoService.errorMessage;
  public readonly members = this.userService.members;

  public onSelectedMember(element: EventTarget | null): void {
    const memberId = Number((element as HTMLSelectElement).value);
    this.todoService.setMemberId(memberId);
  }

  public onSelectedTask(taskId: EventTarget | null): void {
    //
  }
}
