import { Routes } from '@angular/router';
import {Welcome} from './components/welcome/welcome';

export const routes: Routes = [
  {path: 'welcome', component: Welcome},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
];
