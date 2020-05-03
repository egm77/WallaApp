import { getTestBed } from '@angular/core/testing';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../shared/models/item.model';

@Component({
  selector: 'app-favorite-items-modal',
  templateUrl: './favorite-items-modal.component.html',
  styleUrls: ['./favorite-items-modal.component.scss']
})
export class FavoriteItemsModalComponent implements OnInit {
  @Input() items: Item[];
  @Output() clickClose = new EventEmitter();
  @Output() clickItem = new EventEmitter();
  itemsShown: Item[];
  timeout: any = null;
  textSearch = '';

  ngOnInit() {
    this.itemsShown = this.items;
  }

  onClose(): void {
    this.clickClose.emit();
  }

  onDeleteFavItem(deleteFav: Item): void {
    this.clickItem.emit(deleteFav);
    this.items = this.items.filter(
      item => item !== deleteFav
    );
    this.filterItems();

  }

  onTextSearch(): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.filterItems();
    }, 250);
  }

  filterItems(): void {
    const text = this.textSearch;
    if (text !== '') {
      this.itemsShown = this.items.filter(item => item.title.toUpperCase().includes(text.toUpperCase()));
    } else {
      this.itemsShown = this.items;
    }
  }

  getText(): string {
    if (this.items.length === 0) { return 'FAVORITES_MODAL.no_favorites'; }
    if (this.itemsShown.length === 0) { return 'FAVORITES_MODAL.no_items_filtered'; }
    return 'FAVORITES_MODAL.error';
  }

}
