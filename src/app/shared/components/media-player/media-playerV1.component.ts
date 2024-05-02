import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MultimediaServiceV1 } from '@shared/services/multimediaV1.service';
import { NgTemplateOutlet, NgIf, NgClass, AsyncPipe } from '@angular/common';
import { DestroyCustom } from '@core/utils/destroyCustom';
//ESTE COMPONENTE YA NO SE ESTA USANDO, FUE PARTE DEL APRENDIZAJE DEL CURSO
@Component({
    selector: 'app-media-playerV1',
    templateUrl: './media-player.component.html',
    styleUrl: './media-player.component.css',
    standalone: true,
    imports: [NgTemplateOutlet, NgIf, NgClass, AsyncPipe]
})
 class MediaPlayerComponent implements OnInit {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  state: string = 'paused';

  _multimediaService = inject(MultimediaServiceV1);
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
