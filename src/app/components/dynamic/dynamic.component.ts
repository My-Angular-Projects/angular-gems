import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gm-dynamic',
  standalone: true,
  imports: [],
  templateUrl: './dynamic.component.html',
  styleUrl: './dynamic.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicComponent {}
