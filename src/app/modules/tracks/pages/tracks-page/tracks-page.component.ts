import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
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

  // constructor(private _trackService: TrackService) { }
  
  ngOnInit(): void {
    // this._trackService.getAllTracks$()
    // .subscribe(response => {
    //   this.tracksTrending = response;
    // })
  }
}
