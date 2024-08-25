import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
  inject,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WidgetComponent } from './components/widget/widget.component';

@Component({
  selector: 'gm-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public viewContainerRef = viewChild('container', { read: ViewContainerRef });
  #componentRef: ComponentRef<WidgetComponent> | undefined;

  public createComponent(): void {
    this.viewContainerRef()?.clear();
    this.#componentRef =
      this.viewContainerRef()?.createComponent(WidgetComponent);
    this.#componentRef?.setInput('title', 'new title');
    this.#componentRef?.setInput('description', 'new description');

    this.#componentRef?.instance.closed.subscribe(() =>
      this.#componentRef?.destroy()
    );
  }

  public destroyComponent(): void {
    this.viewContainerRef()?.clear();
  }
}
