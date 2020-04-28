import { typeEnum } from 'src/app/item-manager/shared/models/item.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TranslateModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
  });

  it('should emit filter', () => {
    spyOn(component.filterSelected, 'emit');
    component.onFilterSelected();
    expect(component.filterSelected.emit).toHaveBeenCalled();
    expect(component.filterSelected.emit).toHaveBeenCalledWith(component.filterForm.value);
  });

  it('should emit null', () => {
    spyOn(component.filterDeleted, 'emit');
    component.onFilterDeleted();
    expect(component.filterDeleted.emit).toHaveBeenCalled();
    expect(component.filterDeleted.emit).toHaveBeenCalledWith();
  });

  it('should set type value', () => {
    component.filterForm.controls.type.setValue(typeEnum.description);
    component.onChangeKey(typeEnum.title);
    expect(component.filterForm.controls.type.value).toEqual(typeEnum.title);
  });

  it('should get filters avaliables', () => {
    const filters = [{
      id: typeEnum.title,
      text: 'HEADER.title',
      disabled: true
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
    }];

    const expected = [{
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
    }];

    component.filtersAvailables = filters;
    expect(component.getFilterAvailables()).toEqual(expected);
  });
});
