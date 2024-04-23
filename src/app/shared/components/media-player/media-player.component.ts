import { Component, DestroyRef, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MultimediaService } from '@shared/services/multimedia.service';
import { NgTemplateOutlet, NgIf, NgClass, AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { DestroyCustom } from '@core/utils/destroyCustom';

@Component({
    selector: 'app-media-player',
    templateUrl: './media-player.component.html',
    styleUrl: './media-player.component.css',
    standalone: true,
    imports: [NgTemplateOutlet, NgIf, NgClass, AsyncPipe]
})
export class MediaPlayerComponent implements OnInit {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  state: string = 'paused';

  _multimediaService = inject(MultimediaService);
  destroyCustom = DestroyCustom();
  //destroyRef = inject(DestroyRef);
  
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

    this._multimediaService.playerStatus$
    //.pipe(takeUntilDestroyed(this.destroyRef))  //Esta linea hace la desubscripcion
    .pipe(this.destroyCustom())
    .subscribe(status => this.state = status);

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
