import { Routes } from '@angular/router';
import { HomePageComponent } from '@modules/home/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: 'auth', //  http://localhost:4200/auth
    loadChildren: () => import(`./modules/auth/auth.module`).then(m => m.AuthModule)
  },
  {
    path: '', //root  http://localhost:4200/
    component: HomePageComponent,
    loadChildren: () => import(`./modules/home/home.module`).then(m => m.HomeModule)
  },
  {
    path: '**', //TODO 404 cuando no existe la ruta
    redirectTo: '/auth/login'
  }
];
