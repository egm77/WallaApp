import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { typeEnum } from 'src/app/item-manager/shared/models/item.model';
import { Filter } from 'src/app/item-manager/shared/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() filtersAvailables: Filter[];
  @Output() filterSelected = new EventEmitter();
  @Output() filterDeleted = new EventEmitter();

  filterForm = new FormGroup({
    text: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
  });

  constructor() { }

  onFilterSelected(): void {
    this.filterSelected.emit(this.filterForm.value);
  }

  onFilterDeleted(): void {
    this.filterDeleted.emit();
  }

  getFilterAvailables(): Filter[] {
    return this.filtersAvailables.filter(filter => !filter.disabled);
  }

  onChangeKey(key: typeEnum): void {
    this.filterForm.controls.type.setValue(key);
  }
}
