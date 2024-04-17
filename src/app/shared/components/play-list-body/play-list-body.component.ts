import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { OrderListPipe } from '../../pipes/order-list.pipe';
import { ImgBrokenDirective } from '../../directives/img-broken.directive';
import { NgFor, NgTemplateOutlet } from '@angular/common';
@Component({
    selector: 'app-play-list-body',
    templateUrl: './play-list-body.component.html',
    styleUrl: './play-list-body.component.css',
    standalone: true,
    imports: [NgFor, NgTemplateOutlet, ImgBrokenDirective, OrderListPipe]
})
export class PlayListBodyComponent {
  @Input() tracks:TrackModel[] = []
  optionSort:{property:string | null, order:string} = {property: null, order: 'asc'}

  changeSort(property: string): void {
    const { order } = this.optionSort
    this.optionSort = {
      property,
      order: order === 'asc' ? 'desc' : 'asc'
    }
  }
}
