import { Injectable, effect, signal } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  //ESTE SERVICIO SE CREA BASADO EN SIGNAL

  public audio!: HTMLAudioElement //<audio>

  public trackInfoSignal = signal<TrackModel | undefined>(undefined);

  public timeElapsedSignal = signal<string>('00:00');
  public timeRemainingSignal = signal<string>('-00:00');
  public playerStatusSignal = signal<string>('paused');
  public playerPercentageSignal = signal<number>(0);

  constructor() {
    this.audio = new Audio();
    
    effect(() => {
      const dataInfo = this.trackInfoSignal()
      if(dataInfo) this.setAudio(dataInfo);
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
    this.timeElapsedSignal.set(displayFormat);
  }

  private setTimeRemaining(currentTime: number, duration: number): void {
    let timeLeft = duration - currentTime;

    let seconds = Math.floor(timeLeft % 60);
    let minutes = Math.floor((timeLeft / 60) % 60);

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMunites = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMunites}:${displaySeconds}`;
    this.timeRemainingSignal.set(displayFormat);
  }

  private setPlayerStatus = (state: any) => {
    switch (state.type) {
      case 'play':
        this.playerStatusSignal.set('play');
        break;
      case 'playing':
        this.playerStatusSignal.set('playing');
        break;
      case 'ended':
        this.playerStatusSignal.set('ended');
        break;
      default:
        this.playerStatusSignal.set('paused');
        break;
    } 
  }

  setPercentage(currentTime: number, duration: number): void {
    let percentage = (currentTime * 100) / duration;
    this.playerPercentageSignal.set(percentage);
  }
}
