import { typeEnum } from 'src/app/item-manager/shared/models/item.model';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Filter } from 'src/app/item-manager/shared/services/filter.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() items: Filter[];
  @Input() placeholder: string;
  @Input() defaultValue: typeEnum;
  @Output() selectItem = new EventEmitter();
  isOpen = false;
  selectedItem: Filter;
  @ViewChild('toggleButton', { static: false }) toggleButton: ElementRef;
  constructor() { }

  ngOnInit() {
    if (this.defaultValue) {
      this.selectedItem = this.items.find(item => item.id === this.defaultValue);
    }
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  onSelect(item: Filter): void {
    this.selectedItem = item;
    this.selectItem.emit(item.id);
    this.isOpen = false;
  }

  getSelectedTag(): string {
    return this.selectedItem ? this.selectedItem.text : '';
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any) {
    const clickedTypeInside = this.toggleButton.nativeElement.contains(targetElement);
    if (!clickedTypeInside) {
      this.isOpen = false;
    }
  }


}
