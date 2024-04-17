import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { response } from 'express';
import { Subscription } from 'rxjs';
import { NgTemplateOutlet, NgIf, NgClass, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-media-player',
    templateUrl: './media-player.component.html',
    styleUrl: './media-player.component.css',
    standalone: true,
    imports: [NgTemplateOutlet, NgIf, NgClass, AsyncPipe]
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  listObservers$: Array<Subscription> = [];
  state: string = 'paused';

  constructor(public _multimediaService: MultimediaService) { }
  
  ngOnInit(): void {
    //FUNCIONAMIENTO DEL BEHAVIORSUBJECT Y EL OBSERVABLE CON OBSERVER
    // const observable1$ = this._multimediaService.myObservable1$
    // .subscribe({
    //   next: (responseOk) => {
    //     console.log('OK!', responseOk)
    //   },
    //   error: (responseFail) => {
    //     console.log('FAIL!', responseFail)
    //   },
    // }
    // );

    const observer$ = this._multimediaService.playerStatus$
    .subscribe(status => this.state = status);

    this.listObservers$ = [observer$];
  }

  handlePosition(event: MouseEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement;
    const { clientX } = event;
    const { x, width } = elNative.getBoundingClientRect();
    const clickX = clientX - x;

    const percentageFromX = (clickX * 100) / width;
    this._multimediaService.seekAudio(percentageFromX);
  }
  
  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }
  
}
