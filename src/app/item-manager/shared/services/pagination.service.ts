import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  getItemsbyPage (items, itemsPerPage)  {
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
