import { Injectable } from '@angular/core';
import { Item, typeEnum } from '../models/item.model';

export interface Filter {
  text: string;
  id: typeEnum;
  disabled?: boolean;
}

export interface SelectedFilter {
  text?: string;
  type?: typeEnum;
}

@Injectable({
  providedIn: 'root'
})

export class FilterService {

  constructor() { }

  isMatch(item: Item, filters: SelectedFilter[]): boolean {
    let match = true;
    filters.forEach(
      filter => {
        if (typeof item[filter.type] === 'string') {
          if (!item[filter.type].toUpperCase().includes(filter.text.toUpperCase())) {
            match = false;
            return;
          }
        } else {
          if (item[filter.type] !== parseInt(filter.text, 10)) {
            match = false;
            return;
          }
        }

      });
    return match;
  }

  getFilteredDate(items: Item[], filters: SelectedFilter[]): Item[] {
    return items.filter(
      item => this.isMatch(item, filters)
    );
  }

}
