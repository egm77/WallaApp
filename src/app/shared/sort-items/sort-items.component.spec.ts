import { typeEnum } from 'src/app/item-manager/shared/models/item.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortItemsComponent } from './sort-items.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { sortDirecction } from 'src/app/item-manager/shared/services/sort.service';
import { TranslateModule } from '@ngx-translate/core';

describe('SortItemsComponent', () => {
  let component: SortItemsComponent;
  let fixture: ComponentFixture<SortItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortItemsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TranslateModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortItemsComponent);
    component = fixture.componentInstance;
  });

  it('should init keySelected', () => {
    const keySelected = typeEnum.title;
    component.keySelected = keySelected;
    fixture.detectChanges();
    expect(component.keySelected).toEqual(keySelected);
  });

  it('should init keySelected null', () => {
    fixture.detectChanges();
    expect(component.keySelected).toEqual('');
  });

  it('should emit change key', () => {
    const keySelected = typeEnum.title;
    const direction = sortDirecction.ASC;
    component.keySelected = keySelected;
    spyOn(component.sortChanged, 'emit');
    component.onChangeKey();
    expect(component.direction).toEqual(direction);
    expect(component.sortChanged.emit).toHaveBeenCalled();
    expect(component.sortChanged.emit).toHaveBeenCalledWith({keySelected, direction});
  });

  it('should emit change direction DESC', () => {
    const keySelected = typeEnum.title;
    const direction = sortDirecction.ASC;
    const expected = sortDirecction.DESC;
    component.keySelected = keySelected;
    component.direction = direction;
    spyOn(component.sortChanged, 'emit');
    component.onToggleDirection();
    expect(component.keySelected).toEqual(keySelected);
    expect(component.sortChanged.emit).toHaveBeenCalled();
    expect(component.sortChanged.emit).toHaveBeenCalledWith({keySelected, direction: expected});
  });

  it('should emit change direction ASC', () => {
    const keySelected = typeEnum.title;
    const direction = sortDirecction.DESC;
    const expected = sortDirecction.ASC;
    component.keySelected = keySelected;
    component.direction = direction;
    spyOn(component.sortChanged, 'emit');
    component.onToggleDirection();
    expect(component.keySelected).toEqual(keySelected);
    expect(component.sortChanged.emit).toHaveBeenCalled();
    expect(component.sortChanged.emit).toHaveBeenCalledWith({keySelected, direction: expected});
  });

});
