import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { sessionInterceptor } from '@core/interceptors/session.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes), 
    provideClientHydration(), 
    importProvidersFrom(BrowserModule),
    CookieService,
    provideHttpClient(withInterceptors([sessionInterceptor]))
  ]
};
