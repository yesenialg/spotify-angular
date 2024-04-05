import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;

  constructor(private _httpClient: HttpClient) {
  }

  // getAllTracks$(): Observable<any> {
  //    return this._httpClient.get(`${this.URL}/tracks`);
  // }
}
