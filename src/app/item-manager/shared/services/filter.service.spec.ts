import { TestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';

describe('FilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterService = TestBed.get(FilterService);

    const items = [{
      title: 'iPhone 6S Oro',
      description: 'Vendo un iPhone 6 S color Oro nuevo y sin estrenar',
      price: '740',
      email: 'iphonemail@wallapop.com',
      image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/iphone.png'
    },
    {
      title: 'Polaroid 635',
      description: 'Cámara clásica de fotos Polaroid, modelo 635',
      price: '50',
      email: 'cameramail@wallapop.com',
      image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/camera.png'
    }];

    const filters = [{ text: 'Pola', type: 'title' }];


    const expected = [{
      title: 'Polaroid 635',
      description: 'Cámara clásica de fotos Polaroid, modelo 635',
      price: '50',
      email: 'cameramail@wallapop.com',
      image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/camera.png'
    }];


    expect(service.getFilteredDate(items, filters)).toEqual(expected);
  });

});
