import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FavoriteItemsModalComponent } from './favorite-items-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FavoriteItemsModalComponent', () => {
  let component: FavoriteItemsModalComponent;
  let fixture: ComponentFixture<FavoriteItemsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteItemsModalComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteItemsModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.items = [];
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should emit close', () => {
    spyOn(component.clickClose, 'emit');
    component.onClose();
    expect(component.clickClose.emit).toHaveBeenCalled();
  });

  it('should delete fav item', () => {
    const mockItems = [
      {
        title: 'iPhone 6S Oro',
        description: 'Vendo un iPhone 6 S color Oro nuevo y sin estrenar.',
        price: '740',
        email: 'iphonemail@wallapop.com',
        image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/iphone.png',
        fav: true
      },
      {
        title: 'Polaroid 635',
        description: 'Cámara clásica de fotos Polaroid, modelo 635.',
        price: '50',
        email: 'cameramail@wallapop.com',
        image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/camera.png',
        fav: true
      }
    ];
    component.items = mockItems;
    spyOn(component.clickItem, 'emit');
    component.onDeleteFavItem(mockItems[0]);
    expect(component.clickItem.emit).toHaveBeenCalled();
    expect(component.clickItem.emit).toHaveBeenCalledWith(mockItems[0]);
    expect(component.items).toEqual([mockItems[1]]);
    expect(component.itemsShown).toEqual([mockItems[1]]);
  });

  it('should search items when text is no empty', fakeAsync(() => {
    const mockItems = [
      {
        title: 'iPhone 6S Oro',
        description: 'Vendo un iPhone 6 S color Oro nuevo y sin estrenar.',
        price: '740',
        email: 'iphonemail@wallapop.com',
        image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/iphone.png',
        fav: true
      },
      {
        title: 'Polaroid 635',
        description: 'Cámara clásica de fotos Polaroid, modelo 635.',
        price: '50',
        email: 'cameramail@wallapop.com',
        image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/camera.png',
        fav: true
      }
    ];
    component.items = mockItems;
    const event = { target: { value: 'Polaroid' } };
    component.onTextSearch(event);
    tick(250);
    fixture.whenStable().then(() => {
      expect(component.itemsShown).toEqual([mockItems[1]]);
    });
  }));

  it('should reset items when text is empty', fakeAsync(() => {
    const mockItems = [
      {
        title: 'iPhone 6S Oro',
        description: 'Vendo un iPhone 6 S color Oro nuevo y sin estrenar.',
        price: '740',
        email: 'iphonemail@wallapop.com',
        image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/iphone.png',
        fav: true
      },
      {
        title: 'Polaroid 635',
        description: 'Cámara clásica de fotos Polaroid, modelo 635.',
        price: '50',
        email: 'cameramail@wallapop.com',
        image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/camera.png',
        fav: true
      }
    ];
    component.items = mockItems;
    const event = { target: { value: '' } };
    component.onTextSearch(event);
    tick(250);
    fixture.whenStable().then(() => {
      expect(component.itemsShown).toEqual(mockItems);
    });
  }));


  it('should show empty text', () => {
    component.items = [];
    expect(component.getText()).toEqual('NO HAY FAVORITOS');
  });

  it('should show no items found', () => {
    component.items = [{
      title: 'Polaroid 635',
      description: 'Cámara clásica de fotos Polaroid, modelo 635.',
      price: '50',
      email: 'cameramail@wallapop.com',
      image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/camera.png',
      fav: true
    }];
    component.itemsShown = [];
    expect(component.getText()).toEqual('NO SE ENCUENTRAN ELEMENTOS CON EL FILTRO ESTE');
  });

  it('should show error', () => {
    const mockItems = [{
      title: 'Polaroid 635',
      description: 'Cámara clásica de fotos Polaroid, modelo 635.',
      price: '50',
      email: 'cameramail@wallapop.com',
      image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/camera.png',
      fav: true
    }];
    component.items = mockItems;
    component.itemsShown = mockItems;
    expect(component.getText()).toEqual('Error');
  });

});
