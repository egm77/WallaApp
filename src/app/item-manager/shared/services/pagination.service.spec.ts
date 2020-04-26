import { TestBed } from '@angular/core/testing';

import { PaginationService } from './pagination.service';

describe('PaginationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaginationService = TestBed.get(PaginationService);

    const items = [
      {
        title: 'iPhone 6S Oro',
        description: 'Vendo un iPhone 6 S color Oro nuevo y sin estrenar.',
        price: '740',
        email: 'iphonemail@wallapop.com',
        image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/iphone.png'
      },
      {
        title: 'Polaroid 635',
        description: 'Cámara clásica de fotos Polaroid, modelo 635.',
        price: '50',
        email: 'cameramail@wallapop.com',
        image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/camera.png'
      },
      {
        title: 'Bolso piel marca Hoss',
        description: 'Vendo bolso de piel marrón grande de la marca Hoss.',
        price: '250',
        email: 'bagmail@wallapop.com',
        image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/bag.png'
      },
      {
        title: 'Reloj de Daniel Wellington',
        description: 'Reloj de la marca Daniel Wellington usado sólo un mes.',
        price: '100',
        email: 'watchmail@wallapop.com',
        image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/watch.png'
      }
    ];

    const expectedPage1 = [
      {
        title: 'iPhone 6S Oro',
        description: 'Vendo un iPhone 6 S color Oro nuevo y sin estrenar.',
        price: '740',
        email: 'iphonemail@wallapop.com',
        image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/iphone.png'
      },
      {
        title: 'Polaroid 635',
        description: 'Cámara clásica de fotos Polaroid, modelo 635.',
        price: '50',
        email: 'cameramail@wallapop.com',
        image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/camera.png'
      }
    ]

    const expectedPage2 = [
      {
        title: 'Bolso piel marca Hoss',
        description: 'Vendo bolso de piel marrón grande de la marca Hoss.',
        price: '250',
        email: 'bagmail@wallapop.com',
        image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/bag.png'
      },
      {
        title: 'Reloj de Daniel Wellington',
        description: 'Reloj de la marca Daniel Wellington usado sólo un mes.',
        price: '100',
        email: 'watchmail@wallapop.com',
        image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/watch.png'
      }
    ];

    const result = service.getItemsbyPage(items, 2);
    expect(Object.keys(result).length).toBe(2);
    expect(result[1]).toEqual(expectedPage1);
    expect(result[2]).toEqual(expectedPage2);
  });
});
