import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';
import { SectionGenericComponent } from '../../../../shared/components/section-generic/section-generic.component';

@Component({
    selector: 'app-tracks-page',
    templateUrl: './tracks-page.component.html',
    styleUrl: './tracks-page.component.css',
    standalone: true,
    imports: [SectionGenericComponent]
})
export class TracksPageComponent implements OnInit{
  tracksTrending: Array<TrackModel> = [];
  tracksRandom: Array<TrackModel> = [];
  listObservers$: Array<Subscription> = []

  // constructor(private _trackService: TrackService) { }
  private _trackService = inject(TrackService);
  
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
