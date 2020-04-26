import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { typeEnum } from '../shared/models/item.model';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss']
})
export class ItemMenuComponent implements OnInit {

  @Output() filtersChanged = new EventEmitter();
  @Output() openFavoriteItems = new EventEmitter();
  @Output() sortChanged = new EventEmitter();
  @Input() favorites = 0
  @Input() keySelected
  @Input() direction
  @Input() filtersApplied

  constructor() { }

  filters = ['title', 'description', 'price', 'email' ]

  keys = [
    {
      id: typeEnum.title,
      text : 'HEADER.title'
    },
    {
      id: typeEnum.description,
      text : 'HEADER.description'
    },
    {
      id: typeEnum.price,
      text : 'HEADER.price'
    },
    {
      id: typeEnum.email,
      text : 'HEADER.email'
    }
  ];

  ngOnInit() {
  }

  onOpenFavorites() {
    this.openFavoriteItems.emit();
  }

  onApplyFilters(filters) {
    this.filtersChanged.emit(filters);
  }

  onSortChanged(sort) {
    this.sortChanged.emit(sort)
  }

}
