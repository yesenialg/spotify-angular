import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { response } from 'express';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrl: './media-player.component.css'
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  mockCover:TrackModel = {
    cover: 'https://jenesaispop.com/wp-content/uploads/2009/09/guetta_onelove.jpg',
    name: 'Getting Over',
    album: 'One Love',
    url: 'http://localhost:3000/track.mp3',
    _id: 1
  }

  listObservers$: Array<Subscription> = [];

  constructor(private _multimediaService: MultimediaService) { }
  
  ngOnInit(): void {
    const observer1$: Subscription = this._multimediaService.callback.subscribe(
      (response: TrackModel) => {
        console.log("Recibe cancion", response);
      } 
    )

    this.listObservers$ = [observer1$]
  }
  
  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe());
  }
  
}
