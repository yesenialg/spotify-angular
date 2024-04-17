import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const sessionGuard: CanActivateFn = () => {

  const cookieService = inject(CookieService);
  const router = inject(Router);
  try {

    const token: boolean = cookieService.check('token')
    if (!token) {
      router.navigate(['/', 'auth'])
    }
    return token

  } catch (e) {
    console.log('Algo sucedio', e);
    return false
  }
};
