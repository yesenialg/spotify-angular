import { Component } from '@angular/core';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent {

  constructor (private _searchService: SearchService) { }

  listResults$: Observable<any> = of([])
  
  receiveData(event: string): void {
    this.listResults$ = this._searchService.searchTracks$(event)
  }
}
