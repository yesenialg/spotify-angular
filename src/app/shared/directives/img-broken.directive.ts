import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: 'img[appImgBroken]',
    standalone: true
})
export class ImgBrokenDirective {
  @HostListener('error') handleError(): void {
    const elNative = this.elHost.nativeElement;
    elNative.src = '../../../assets/images/broken-image.png'
  }
  constructor(private elHost: ElementRef) { }

}
