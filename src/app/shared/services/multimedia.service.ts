import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  // callback: EventEmitter<any> = new EventEmitter<any>();

  //myObservable1$: BehaviorSubject<any> = new BehaviorSubject('Llega la info'); //Observable<any> = new Observable()

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public audio!: HTMLAudioElement //<audio>
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00');
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00');
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused');
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    //FUNCIONAMIENTO DEL BEHAVIORSUBJECT
    // this.myObservable1$.next('Se envia la info')

    // setTimeout(() => {
    //   this.myObservable1$.next('Hay un error')
    // }, 1000)

    // setTimeout(() => {
    //   this.myObservable1$.error('Hay un error')
    // }, 2000)

    //FUNCIONAMIENTO DE OBSERVER EN OBSERVABLE
    // this.myObservable1$ = new Observable(
    //   (observer: Observer<any>) => {
    //     observer.next('Se envia la info')

    //     setTimeout(() => {
    //       observer.complete()
    //     }, 1000)

    //     setTimeout(() => {
    //       observer.error('Hay un error')
    //     }, 2500)
    //   }
    // )

    this.audio = new Audio();
    this.trackInfo$.subscribe(responseOk => {
      if(responseOk){
        this.setAudio(responseOk);
      }
    })

    this.listenAllEvents();
  }

  public togglePlayer(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause(); 
  }

  public seekAudio(percentaje: number): void {
    const { duration } = this.audio;
    const percentageToSecond = ( percentaje * duration) / 100;
    this.audio.currentTime = percentageToSecond;
  }
   
  //Tambien puede ser publica
  private setAudio(track: TrackModel): void{
    this.audio.src = track.url;
    this.audio.play();
  }

  //Escucha los eventos de la variable audio HTMLAudioElement
  private listenAllEvents(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false);
    this.audio.addEventListener('playing', this.setPlayerStatus, false);
    this.audio.addEventListener('play', this.setPlayerStatus, false);
    this.audio.addEventListener('pause', this.setPlayerStatus, false);
    this.audio.addEventListener('ended', this.setPlayerStatus, false);
  }

  private calculateTime = () => {
    const { duration, currentTime } = this.audio;
    this.setTimeElapsed(currentTime);
    this.setTimeRemaining(currentTime, duration);
    this.setPercentage(currentTime, duration);
  }

  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60);
    let minutes = Math.floor((currentTime / 60) % 60);

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMunites = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `${displayMunites}:${displaySeconds}`;
    this.timeElapsed$.next(displayFormat);
  }

  private setTimeRemaining(currentTime: number, duration: number): void {
    let timeLeft = duration - currentTime;

    let seconds = Math.floor(timeLeft % 60);
    let minutes = Math.floor((timeLeft / 60) % 60);

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMunites = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMunites}:${displaySeconds}`;
    this.timeRemaining$.next(displayFormat);
  }

  private setPlayerStatus = (state: any) => {
    switch (state.type) {
      case 'play':
        this.playerStatus$.next('play');
        break;
      case 'playing':
        this.playerStatus$.next('playing');
        break;
      case 'ended':
        this.playerStatus$.next('ended');
        break;
      default:
        this.playerStatus$.next('paused');
        break;
    } 
  }

  setPercentage(currentTime: number, duration: number): void {
    let percentage = (currentTime * 100) / duration;
    this.playerPercentage$.next(percentage);
  }
}
