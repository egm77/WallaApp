import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';
import { TranslateModule } from '@ngx-translate/core';
import { typeEnum } from 'src/app/item-manager/shared/models/item.model';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownComponent ],
      imports: [TranslateModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown', () => {
    component.isOpen = false;
    component.toggle()
    expect(component.isOpen).toEqual(true);
  });

  it('should select option', () => {
    spyOn(component.selectItem, 'emit');
    const item = {
      id: typeEnum.title,
      text: 'HEADER.title'
    }
    component.onSelect(item);
    expect(component.isOpen).toEqual(false);
    expect(component.selectedItem).toEqual(item);
    expect(component.selectItem.emit).toHaveBeenCalled();
    expect(component.selectItem.emit).toHaveBeenCalledWith(item.id);
  });

  it('should get item text', () => {
    const item = {
      id: typeEnum.title,
      text: 'HEADER.title'
    }
    component.selectedItem = item;
    expect(component.getSelectedTag()).toEqual(item.text);
  });

  it('should set selectedItem', () => {
    const defaultValue = typeEnum.title;

    const items = [
      {
        id: typeEnum.title,
        text: 'HEADER.title'
      },
     {
        id: typeEnum.title,
        text: 'HEADER.title'
      }
    ];
    component.defaultValue = defaultValue;
    component.items = items;
    component.ngOnInit();
    expect(component.selectedItem).toEqual(items[0]);
  });
});
