import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule]
})
export class SearchComponent {

  //Output -> envía datos al padre (app-history-page)
  @Output() callbackData: EventEmitter<any> = new EventEmitter()

  src: string = '';

  callSearch(term: string): void {
    if (term.length >= 3) {
      this.callbackData.emit(term)
      }
  }
}
