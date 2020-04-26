import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss']
})
export class PillComponent implements OnInit {
  @Input() primaryText: string;
  @Input() secondaryText: string;
  @Output() closeClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.closeClick.emit();
  }

}
