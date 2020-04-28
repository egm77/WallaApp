import { Component, EventEmitter, Input, Output } from '@angular/core';
import { typeEnum } from '../shared/models/item.model';
import { actionsEnum } from './../shared/constants/actions.constants';
import { orderEnum } from '../shared/services/sort.service';
import { SelectedFilter, Filter } from '../shared/services/filter.service';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss']
})
export class ItemMenuComponent {

  @Output() filtersChanged = new EventEmitter();
  @Output() openFavoriteItems = new EventEmitter();
  @Output() sortChanged = new EventEmitter();
  @Output() action = new EventEmitter();
  @Input() favorites = 0;
  @Input() keySelected: typeEnum;
  @Input() direction: orderEnum;
  @Input() filtersApplied: SelectedFilter[];

  actionsEnum = actionsEnum;

  keys: Filter[] = [
    {
      id: typeEnum.title,
      text: 'HEADER.title'
    },
    {
      id: typeEnum.description,
      text: 'HEADER.description'
    },
    {
      id: typeEnum.price,
      text: 'HEADER.price'
    },
    {
      id: typeEnum.email,
      text: 'HEADER.email'
    }
  ];

  onAction(action: actionsEnum, data?: any) {
    this.action.emit({ action, data });
  }

}
