import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        FavoritesRoutingModule,
        SharedModule,
        FavoritesPageComponent
    ]
})
export class FavoritesModule { }
