import { HttpClient } from "@angular/common/http"
import { inject } from "@angular/core";
import { TrackModel } from "@core/models/tracks.model";
import { Observable, catchError, map, mergeMap, of } from "rxjs"
import { environment } from "src/environments/environment.development"

const URL = environment.api;

export const getAllTracksV2$ = (): Observable<any> => {
    return inject(HttpClient).get(`${URL}/tracks`)
    .pipe(
        map((dataRaw: any) => {
        return dataRaw.data
        })
    )
}
 
 export const getAllRandomV2$ = (): Observable<any> => {
    return inject(HttpClient).get(`${URL}/tracks`)
    .pipe(
        mergeMap(({ data }: any) => skipByIdV2(data, 2)),
        catchError((err) =>{
        const { status, statusText } = err;
        console.log('Error con el pipe', [status, statusText])
        return of([])
        })
    )
}

export const skipByIdV2 = (
    listTracks: TrackModel[], 
    id: number
): Promise<TrackModel[]> => {
    return new Promise((resolve, reject) => {
        const listTemp = listTracks.filter(a => a._id !== id)
        resolve(listTemp)
    })
}