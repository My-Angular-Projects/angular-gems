import { Component, input, output } from '@angular/core';

@Component({
  selector: 'gm-widget',
  standalone: true,
  imports: [],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
})
export class WidgetComponent {
  title = input('widget title');
  description = input('widget description');

  closed = output<void>();
}
