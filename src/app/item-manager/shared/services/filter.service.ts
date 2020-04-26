import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})

export class FilterService {

  constructor() { }

  isMatch(item: Item, filters) {
    let match = true;
    filters.forEach(
      filter => {
        if (!item[filter.type].toUpperCase().includes(filter.text.toUpperCase())) {
          match = false;
          return;
        }
      });
    return match;
  }

  getFilteredDate(items, filters) {
    return items.filter(
      item => this.isMatch(item, filters)
    );
  }

}
