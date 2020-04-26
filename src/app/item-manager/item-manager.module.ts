import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemManagerRoutingModule } from './item-manager-routing.module';
import { ItemManagerComponent } from './item-manager.component';
import { ItemMenuComponent } from './item-menu/item-menu.component';
import { FavoriteItemsModalComponent } from './favorite-items-modal/favorite-items-modal.component';


@NgModule({
  declarations: [ItemManagerComponent, ItemMenuComponent, FavoriteItemsModalComponent],
  imports: [
    CommonModule,
    ItemManagerRoutingModule,
    SharedModule,
  ]
})
export class ItemManagerModule { }
