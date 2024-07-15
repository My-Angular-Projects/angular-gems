import { Routes } from '@angular/router';
import { HostComponent } from './components/host/host.component';

export const routes: Routes = [
  { path: '', loadComponent: () => HostComponent },
];
