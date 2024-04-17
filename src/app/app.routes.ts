import { Routes } from '@angular/router';
import { sessionGuard } from '@core/guards/session.guard';
import { HomePageComponent } from '@modules/home/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: 'auth', //  http://localhost:4200/auth
    loadChildren: () => import(`./modules/auth/auth.module`).then(m => m.AuthModule)
  },
  {
    path: '', //root  http://localhost:4200/
    component: HomePageComponent,
    loadChildren: () => import(`./modules/home/home.module`).then(m => m.HomeModule),
    canActivate: [sessionGuard]
  }
];
