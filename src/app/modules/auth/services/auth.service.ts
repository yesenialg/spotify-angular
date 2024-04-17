import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = environment.api;

  constructor(private _httpClient: HttpClient, private _cookie: CookieService) { }

  sendCredentials(email: string, password: string): Observable<any> {
    
    const body =  { 
      email, 
      password 
    };
    
    return this._httpClient.post(`${this.URL}/auth/login`,body)
    .pipe(
      tap((responseOk: any) => {
        const { tokenSession, data } = responseOk;
        this._cookie.set('token', tokenSession, 4, '/')
      })
    );
  }
}
