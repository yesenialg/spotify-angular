import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';
import { SectionGenericComponent } from '../../../../shared/components/section-generic/section-generic.component';
import { getAllRandomV2$, getAllTracksV2$ } from '@modules/tracks/services/tracksv2.service';

@Component({
    selector: 'app-tracks-pageV2',
    templateUrl: './tracks-page.component.html',
    styleUrl: './tracks-page.component.css',
    standalone: true,
    imports: [SectionGenericComponent]
})
export class TracksPageComponentV2{
  tracksTrending: Array<TrackModel> = [];
  tracksRandom: Array<TrackModel> = [];
  listObservers$: Array<Subscription> = []

  constructor() { 
    //Estas subscripciones son a httpClient, por lo que no se necesita desubscribir
    getAllTracksV2$()
    .subscribe((response: TrackModel[]) => {
      this.tracksTrending = response;
    })

    //Estas subscripciones son a httpClient, por lo que no se necesita desubscribir
    getAllRandomV2$()
    .subscribe((response: TrackModel[]) => {
      this.tracksRandom = response;
    })
  }
}
