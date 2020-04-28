import { actionsEnum } from './shared/constants/actions.constants';
import { FilterService, SelectedFilter } from './shared/services/filter.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Item, typeEnum } from './shared/models/item.model';
import { ItemService } from './shared/services/item.service';
import { PaginationService, IitemsPerPage } from './shared/services/pagination.service';
import { SortService, Sort, orderEnum } from './shared/services/sort.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-item-manager',
  templateUrl: './item-manager.component.html',
  styleUrls: ['./item-manager.component.scss']
})
export class ItemManagerComponent implements OnInit {
  defaultPage = 1;
  isLoading$ = new BehaviorSubject(false);
  items: Item[];
  filteredItems: Item[];
  headers = ['image', 'title', 'description', 'price', 'email'];
  favItems: Item[];
  openFavoriteModal = false;
  pages: number;
  maxItemsToShow = 5;
  itemsPage: IitemsPerPage;
  currentPage = this.defaultPage;
  direction: orderEnum;
  keySelected: typeEnum;
  filters: SelectedFilter[];
  errorMsg: string;


  actions = {
    [actionsEnum.sort]: (event: Sort) => this.onSortChanged(event),
    [actionsEnum.favorites]: () => this.onShowFavoriteModal(true),
    [actionsEnum.filter]: (event: SelectedFilter[]) => this.onUpdateFilters(event)
  };

  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    private pagination: PaginationService,
    private sort: SortService,
    private filter: FilterService
  ) { }


  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.isLoading$.next(true);
    this.itemService
      .getItems()
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe(
        {
          next: (response) => {
            this.items = response;
            this.initItems();
            this.updatePages();
            this.getSortFromParams();
            this.errorMsg = null;
          },
          error: (err: HttpErrorResponse) => {
            this.errorMsg = 'ERROR.DEFAULT';
          }
        }
      );
  }

  initItems(): void {
    const filters = this.getFiltersFromParams();
    if (filters) {
      this.onUpdateFilters(filters);
    } else {
      this.filteredItems = this.items;
    }
  }

  getFiltersFromParams(): SelectedFilter[] {
    const paramsFilters = this.route.snapshot.queryParamMap.get('filter');
    if (!paramsFilters) { return null; }
    this.filters = JSON.parse(paramsFilters);

    if (this.filters && this.filters.length) {
      return this.filters;
    }
  }

  getSortFromParams(): void {
    this.keySelected = this.route.snapshot.queryParamMap.get('keySelected') as typeEnum;
    this.direction = this.route.snapshot.queryParamMap.get('direction') as orderEnum;

    if (this.keySelected && this.direction) {
      this.onSortChanged({ keySelected: this.keySelected, direction: this.direction });
    }
  }

  onUpdateFilters(filters: SelectedFilter[]): void {
    if (filters.length) {
      this.filteredItems = this.filter.getFilteredDate(this.items, filters)
      this.setUrlFilters(JSON.stringify(filters));
    } else {
      this.filteredItems = this.items;
      this.setUrlFilters(null);
    }
    this.updatePages();
  }

  setUrlFilters(filter: string): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { filter },
        queryParamsHandling: 'merge',
      });
  }

  onAction(event: { action: actionsEnum, data: any }) {
    return this.actions[event.action](event.data);
  }

  onToggleFav(item: Item): void {
    const itemClicked = this.items.find((i) => i === item);
    itemClicked.fav = !itemClicked.fav;
  }

  onShowFavoriteModal(open: boolean): void {
    this.openFavoriteModal = open;
  }

  getFavoritesAmount(): number {
    return this.getFavoriteItems().length;
  }

  updatePages(): void {
    this.setPages();
    this.currentPage = this.defaultPage;
  }

  setPages(): void {
    const itemsPage = this.pagination.getItemsbyPage(this.filteredItems, this.maxItemsToShow);
    this.itemsPage = itemsPage;
    this.pages = Object.keys(itemsPage).length;
  }

  onChangePage(page: number): void {
    this.currentPage = page;
  }


  onSortChanged(sort: Sort): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: sort,
        queryParamsHandling: 'merge',
      });

    this.filteredItems = this.sort.sortBy(this.filteredItems, sort);
    this.setPages();
  }

  getFavoriteItems(): Item[] {
    return this.items.filter(item => item.fav);
  }

}
