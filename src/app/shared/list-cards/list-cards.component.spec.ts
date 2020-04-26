import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCardsComponent } from './list-cards.component';

describe('ListCardsComponent', () => {
  let component: ListCardsComponent;
  let fixture: ComponentFixture<ListCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit clickFav', () => {
    spyOn(component.clickFav, 'emit');
    const item = {
      title: 'iPhone 6S Oro',
      description: 'Vendo un iPhone 6 S color Oro nuevo y sin estrenar.',
      price: '740',
      email: 'iphonemail@wallapop.com',
      image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/iphone.png',
      fav: false
    };
    component.onFavClicked(item);
    expect(component.clickFav.emit).toHaveBeenCalled();
    expect(component.clickFav.emit).toHaveBeenCalledWith(item);
  });
});
