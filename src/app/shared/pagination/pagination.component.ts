import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() pageSelected = 1;
  @Input() pagesAmount: number;
  @Output() pageChanged = new EventEmitter();

  arrayPages: any[]

  constructor() { }

  ngOnInit() {
    this.arrayPages = _.range(1, (this.pagesAmount + 1));
    console.log('test', this.arrayPages, this.pagesAmount);
  }

  onChangePage(page: number) {
    this.pageChanged.emit(page);
  }

}
