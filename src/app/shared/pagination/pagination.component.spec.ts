import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  it('should create arrayPages', () => {
    const pagesNumber = 5;
    component.pagesAmount = pagesNumber;
    fixture.detectChanges();
    expect(component.arrayPages.length).toEqual(pagesNumber);
  });

  it('should emit change page', () => {
    spyOn(component.pageChanged, 'emit');
    const currentPage = 5;
    component.onChangePage(currentPage);
    expect(component.pageChanged.emit).toHaveBeenCalled();
    expect(component.pageChanged.emit).toHaveBeenCalledWith(currentPage);
  });
});
