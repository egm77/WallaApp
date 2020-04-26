import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { typeEnum } from 'src/app/item-manager/shared/models/item.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() filters: { text: string, id: typeEnum }[];
  @Input() filtersApplied = [];
  @Output() filtersUpdate = new EventEmitter();

  filterAvailables: { text: string, id: typeEnum, disabled?: boolean }[];
  currentFilter: { text?: string, type?: typeEnum };

  @ViewChild('filterSelector', { static: false }) filterSelector: ElementRef;

  constructor() { }

  ngOnInit() {
    this.filterAvailables = this.filters;
    if (!this.filtersApplied) {
      this.filtersApplied = [];
    }
  }

  onAddFilter() {
    this.currentFilter = this.currentFilter ? null : {};
  }

  isAnyEnabled() {
    return (this.filterAvailables.find(filter => !filter.disabled) != null);
  }

  onApplyFilter(filter) {
    this.filtersApplied.push(filter);
    this.currentFilter = null;
    this.filterAvailables.find(filterAvailables => filterAvailables.id === filter.type).disabled = true;
    this.filtersUpdate.emit(this.filtersApplied);
  }

  onDeleteCurrentFilter() {
    this.currentFilter = null;
  }

  getTranslateTag(type: typeEnum): string {
    return this.filterAvailables.find(filterAvailable => filterAvailable.id === type).text;
  }

  onDeleteAppliedFilter(index: number) {
    this.filterAvailables.find(filterAvailables => filterAvailables.id === this.filtersApplied[index].type).disabled = false;
    this.filtersApplied.splice(index, 1);
    this.filtersUpdate.emit(this.filtersApplied);
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: ElementRef) {
    if (this.filterSelector) {
      const clickedTypeInside = this.filterSelector.nativeElement.contains(targetElement);
      if (!clickedTypeInside) {
        this.onDeleteCurrentFilter();
      }

    }
  }
}
