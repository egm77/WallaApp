import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PillComponent } from './pill.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PillComponent', () => {
  let component: PillComponent;
  let fixture: ComponentFixture<PillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PillComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TranslateModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit close', () => {
    spyOn(component.closeClick, 'emit');
    component.onClose()
    expect(component.closeClick.emit).toHaveBeenCalled();
  });
});
