import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { ImgBrokenDirective } from '../../directives/img-broken.directive';
import { NgIf, NgClass } from '@angular/common';

@Component({
    selector: 'app-card-player',
    templateUrl: './card-player.component.html',
    styleUrl: './card-player.component.css',
    standalone: true,
    imports: [NgIf, ImgBrokenDirective, NgClass]
})
export class CardPlayerComponent {
  @Input({required: true}) mode: 'small' | 'big' = 'small';
  @Input({required: true, alias: 'trackObject'}) track:TrackModel = { _id: 0, name: '', album: '', url: '', cover: ''};
  
  constructor(private _multimediaService: MultimediaService) {}

  sendPlay(track: TrackModel): void {
    this._multimediaService.trackInfo$.next(track);
  }
}
