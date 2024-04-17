import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { TrackModel } from '@core/models/tracks.model';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;

  constructor(private _httpClient: HttpClient) {
  }

  private skipById(listTracks: TrackModel[], id: number): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTemp = listTracks.filter(a => a._id !== id)
      resolve(listTemp)
    })
  }

  getAllTracks$(): Observable<any> {
     return this._httpClient.get(`${this.URL}/tracks`)
     .pipe(
      map((dataRaw: any) => {
        return dataRaw.data
      })
     )
  }
  
  getAllRandom$(): Observable<any> {
     return this._httpClient.get(`${this.URL}/tracks`)
     .pipe(
      mergeMap(({ data }: any) => this.skipById(data, 2)),
      catchError((err) =>{
        const { status, statusText } = err;
        console.log('Error con el pipe', [status, statusText])
        return of([])
      })
     )
  }
}
