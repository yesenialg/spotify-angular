import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryPageComponent } from './pages/history-page/history-page.component';

import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';


@NgModule({
    imports: [
    CommonModule,
    HistoryRoutingModule,
    FormsModule,
    HistoryPageComponent,
    SearchComponent
]
})
export class HistoryModule { }
