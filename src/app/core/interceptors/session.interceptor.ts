import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const sessionInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  
  const cookieService = inject(CookieService);
  
  try{
    const token = cookieService.get('token');
    let newRequest = request;
    newRequest = request.clone(
      {
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      }
    )
    return next(newRequest);
  }catch (e){
    console.log('Error en la petición', e);
    return next(request);
  }
  
};
