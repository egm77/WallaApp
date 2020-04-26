import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/item-manager/shared/models/item.model';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.scss']
})
export class ListCardsComponent {

  @Input() items: Item[];
  @Output() clickFav = new EventEmitter<Item>();

  onFavClicked(item: Item) {
    this.clickFav.emit(item);
  }

}
