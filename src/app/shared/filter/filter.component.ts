import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { typeEnum } from 'src/app/item-manager/shared/models/item.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() filtersAvailables: { text: string, id: typeEnum, disabled: boolean }[];
  @Output() filterSelected = new EventEmitter();
  @Output() filterDeleted = new EventEmitter();

  filterForm = new FormGroup({
    text: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
  });

  constructor() { }

  ngOnInit() {
    console.log(this.filtersAvailables)
  }

  onFilterSelected() {
    this.filterSelected.emit(this.filterForm.value);
  }

  onFilterDeleted() {
    this.filterDeleted.emit();
  }
}
