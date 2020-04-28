import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

export interface IitemsPerPage {
  [key: string]: Item[];
}

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  getItemsbyPage(items: Item[], itemsPerPage: number): IitemsPerPage {
    const itemsByPage = {};
    items.forEach((element, index) => {
      const pageNumber = Math.floor(index / itemsPerPage) + 1;
      if (itemsByPage[pageNumber]) {
        itemsByPage[pageNumber].push(element);
      } else {
        itemsByPage[pageNumber] = [];
        itemsByPage[pageNumber].push(element);
      }
    });
    return itemsByPage;
  }
}
