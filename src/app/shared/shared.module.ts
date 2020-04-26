import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters/filters.component';
import { FilterComponent } from './filter/filter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PillComponent } from './pill/pill.component';
import { ListCardsComponent } from './list-cards/list-cards.component';
import { SortItemsComponent } from './sort-items/sort-items.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    FiltersComponent, FilterComponent, PillComponent, ListCardsComponent, SortItemsComponent, PaginationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
  ],
  exports: [FiltersComponent, FilterComponent, PillComponent, ListCardsComponent, SortItemsComponent, PaginationComponent, TranslateModule],
})
export class SharedModule { }
