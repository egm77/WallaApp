import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { every } from 'rxjs/operators';
import { orderEnum } from 'src/app/item-manager/shared/services/sort.service';
import { typeEnum } from 'src/app/item-manager/shared/models/item.model';

@Component({
  selector: 'app-sort-items',
  templateUrl: './sort-items.component.html',
  styleUrls: ['./sort-items.component.scss']
})
export class SortItemsComponent implements OnInit {

  @Input() keySelected: typeEnum;
  @Input() keys: { text: string, id: typeEnum }[];
  @Input() direction: orderEnum;
  @Output() sortChanged = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  onChangeKey(keySelected: typeEnum) {
    this.keySelected = keySelected;
    this.direction = orderEnum.ASC;
    this.sortChanged.emit({ keySelected: this.keySelected, direction: this.direction });
  }

  onToggleDirection() {
    this.direction = this.direction === orderEnum.ASC ? orderEnum.DESC : orderEnum.ASC;
    this.sortChanged.emit({ keySelected: this.keySelected, direction: this.direction });
  }
}
