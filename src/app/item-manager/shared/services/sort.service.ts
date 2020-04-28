import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

export const enum orderEnum {
  ASC = 'ASC',
  DESC = 'DESC'
}
export interface Sort {
  keySelected: string;
  direction: orderEnum;
}
@Injectable({
  providedIn: 'root'
})

export class SortService {

  constructor() { }

  sortBy(items: Item[], sort: Sort): Item[] {
    if (items.length) {
      if (typeof items[0][sort.keySelected] === 'string') {
        if (sort.direction === orderEnum.ASC) {
          return items.sort((a, b) => (a[sort.keySelected].toUpperCase() > b[sort.keySelected].toUpperCase()) ? 1 : -1);
        }
        return items.sort((a, b) => (a[sort.keySelected].toUpperCase() < b[sort.keySelected].toUpperCase()) ? 1 : -1);
      } else {
        if (sort.direction === orderEnum.ASC) {
          return items.sort((a, b) => (a[sort.keySelected] > b[sort.keySelected]) ? 1 : -1);
        }
        return items.sort((a, b) => (a[sort.keySelected] < b[sort.keySelected]) ? 1 : -1);
      }
    }
    return items;
  }
}
