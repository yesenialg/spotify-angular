import { Component } from '@angular/core';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PlayListBodyComponent } from '../../../../shared/components/play-list-body/play-list-body.component';
import { SearchComponent } from '../../components/search/search.component';

@Component({
    selector: 'app-history-page',
    templateUrl: './history-page.component.html',
    styleUrl: './history-page.component.css',
    standalone: true,
    imports: [SearchComponent, PlayListBodyComponent, AsyncPipe]
})
export class HistoryPageComponent {

  constructor (private _searchService: SearchService) { }

  listResults$: Observable<any> = of([])
  
  receiveData(event: string): void {
    this.listResults$ = this._searchService.searchTracks$(event)
  }
}
