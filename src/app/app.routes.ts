import { Routes } from '@angular/router';
import {Welcome} from './components/welcome/welcome';
import {Game} from './components/game/game';

export const routes: Routes = [
  {path: 'welcome', component: Welcome},
  {path: 'game', component: Game},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
];
