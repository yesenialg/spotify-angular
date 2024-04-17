import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: AuthPageComponent
  },
  {
    path: '**', //TODO 404 cuando no existe la ruta
    redirectTo: 'login'
  }
];
