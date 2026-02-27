import { Routes } from '@angular/router';
import {Welcome} from './components/welcome/welcome';
import {GameComponent} from './components/game/game.component';

export const routes: Routes = [
  {path: 'welcome', component: Welcome},
  {path: 'game', component: GameComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
];
