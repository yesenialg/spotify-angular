import { Component, ElementRef, ViewChild, effect, inject } from '@angular/core';
import { MultimediaService } from '@shared/services/multimedia.service';
import { NgTemplateOutlet, NgIf, NgClass, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-media-player',
    templateUrl: './media-player.component.html',
    styleUrl: './media-player.component.css',
    standalone: true,
    imports: [NgTemplateOutlet, NgIf, NgClass, AsyncPipe]
})
export class MediaPlayerComponent{
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  state: string = 'paused';

  _multimediaService = inject(MultimediaService);

  constructor() {
    effect(() => {
      const state = this._multimediaService.playerStatusSignal();
      this.state = state;
    })
  }

  handlePosition(event: MouseEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement;
    const { clientX } = event;
    const { x, width } = elNative.getBoundingClientRect();
    const clickX = clientX - x;

    const percentageFromX = (clickX * 100) / width;
    this._multimediaService.seekAudio(percentageFromX);
  }
  
}
