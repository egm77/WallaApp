import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TranslateModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});
