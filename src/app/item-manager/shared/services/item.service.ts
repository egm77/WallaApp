import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private http: HttpClient
  ) { }

  getItems(): Observable<Item[]> {
    return this.http
      .get<{ items: Item[] }>(`${environment.baseUrl}/items.json`)
      .pipe(
        map(response => response.items.map(o => new Item(o)))
      );
  }
}
