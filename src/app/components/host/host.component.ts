import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DynamicComponent } from '../dynamic/dynamic.component';

@Component({
  selector: 'gm-host',
  standalone: true,
  imports: [],
  templateUrl: './host.component.html',
  styleUrl: './host.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostComponent {
  @ViewChild('dynamic', { read: ViewContainerRef })
  private viewRef!: ViewContainerRef;
  private componentRef!: ComponentRef<DynamicComponent>;

  public showDynamicComponent(): void {
    // destroys all views in container
    this.viewRef.clear();
    this.componentRef = this.viewRef.createComponent(DynamicComponent);
  }

  public removeDynamicComponent(): void {
    // destroys all views in container
    this.viewRef.clear();
  }
}
