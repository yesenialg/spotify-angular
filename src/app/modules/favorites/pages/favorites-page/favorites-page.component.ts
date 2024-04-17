import { Component } from '@angular/core';
import { PlayListBodyComponent } from '../../../../shared/components/play-list-body/play-list-body.component';
import { PlayListHeaderComponent } from '../../../../shared/components/play-list-header/play-list-header.component';

@Component({
    selector: 'app-favorites-page',
    templateUrl: './favorites-page.component.html',
    styleUrl: './favorites-page.component.css',
    standalone: true,
    imports: [PlayListHeaderComponent, PlayListBodyComponent]
})
export class FavoritesPageComponent {

}
