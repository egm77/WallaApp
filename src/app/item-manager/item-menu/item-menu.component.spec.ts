import { typeEnum } from 'src/app/item-manager/shared/models/item.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMenuComponent } from './item-menu.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { actionsEnum } from '../shared/constants/actions.constants';

describe('ItemMenuComponent', () => {
  let component: ItemMenuComponent;
  let fixture: ComponentFixture<ItemMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemMenuComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit action', () => {
    spyOn(component.action, 'emit');
    component.onAction(actionsEnum.favorites, 'test')
    expect(component.action.emit).toHaveBeenCalled();
    expect(component.action.emit).toHaveBeenCalledWith({ action: actionsEnum.favorites, data: 'test'});

  });
});
