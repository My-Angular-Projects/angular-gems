import { Component } from '@angular/core';

@Component({
  selector: 'gm-todos',
  standalone: true,
  imports: [],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {
  public onSelectedMember(memberId: number): void {
    //
  }

  public onSelectedTask(taskId: number): void {
    //
  }
}
