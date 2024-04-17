import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.css'
})
export class TracksPageComponent implements OnInit{
  tracksTrending: Array<TrackModel> = [];
  tracksRandom: Array<TrackModel> = [];

  listObservers$: Array<Subscription> = []

  constructor(private _trackService: TrackService) { }
  
  ngOnInit(): void {
    this.loadDataAll();
    this.loadDataRandom();
  }

  loadDataAll(): void {
    //Estas subscripciones son a httpClient, por lo que no se deben desubscribir
    this._trackService.getAllTracks$()
    .subscribe((response: TrackModel[]) => {
      this.tracksTrending = response;
    })
  }

  loadDataRandom(): void {
    //Estas subscripciones son a httpClient, por lo que no se deben desubscribir
    this._trackService.getAllRandom$()
    .subscribe((response: TrackModel[]) => {
      this.tracksRandom = response;
    })
  }
}
