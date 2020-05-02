import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { typeEnum } from 'src/app/item-manager/shared/models/item.model';
import { Filter, SelectedFilter } from 'src/app/item-manager/shared/services/filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() filters: Filter[];
  @Input() filtersApplied: SelectedFilter[] = [];
  @Output() filtersUpdate = new EventEmitter();

  filterAvailables: Filter[];
  currentFilter: SelectedFilter;

  @ViewChild('filterSelector', { static: false }) filterSelector: ElementRef;

  constructor() { }

  ngOnInit() {
    this.filterAvailables = this.filters;
    if (!this.filtersApplied) {
      this.filtersApplied = [];
    } else {
      this.filtersApplied.forEach(
        filtersApplied => this.disableFilter(filtersApplied)
      );
    }
  }

  onAddFilter(): void {
    this.currentFilter = this.currentFilter ? null : {};
  }

  isAnyEnabled(): boolean {
    return (this.filterAvailables.find(filter => !filter.disabled) != null);
  }

  onApplyFilter(filter: SelectedFilter): void {
    this.filtersApplied.push(filter);
    this.currentFilter = null;
    this.disableFilter(filter);
    this.filtersUpdate.emit(this.filtersApplied);
  }

  disableFilter(filter: SelectedFilter): void {
    console.log('test', this.filterAvailables)
    this.filterAvailables.find(filterAvailables => filterAvailables.id === filter.type).disabled = true;
  }

  onDeleteCurrentFilter(): void {
    this.currentFilter = null;
  }

  getTranslateTag(type: typeEnum): string {
    return this.filterAvailables.find(filterAvailable => filterAvailable.id === type).text;
  }

  onDeleteAppliedFilter(index: number): void {
    this.filterAvailables.find(filterAvailables => filterAvailables.id === this.filtersApplied[index].type).disabled = false;
    this.filtersApplied.splice(index, 1);
    this.filtersUpdate.emit(this.filtersApplied);
  }
}
