import { SortService, sortDirecction } from './shared/services/sort.service';
import { PaginationService } from './shared/services/pagination.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { ItemManagerComponent } from './item-manager.component';
import { ItemService } from './shared/services/item.service';
import { FilterService } from './shared/services/filter.service';
import { typeEnum } from './shared/models/item.model';


describe('ItemManagerComponent', () => {
  let component: ItemManagerComponent;
  let fixture: ComponentFixture<ItemManagerComponent>;
  let router: jasmine.SpyObj<Router>;
  let itemService: jasmine.SpyObj<ItemService>;
  let filterService: jasmine.SpyObj<FilterService>;
  let sortService: jasmine.SpyObj<SortService>;
  let paginationService: jasmine.SpyObj<PaginationService>;
  let activatedRoute: jasmine.SpyObj<ActivatedRouteStub>;

  beforeEach(async(() => {
    const spyItemService = jasmine.createSpyObj('ItemService', ['getItems']);
    const spyFilterService = jasmine.createSpyObj('FilterService', ['getFilteredDate']);
    const spyPaginationService = jasmine.createSpyObj('PaginationService', ['getItemsbyPage']);
    const spySortService = jasmine.createSpyObj('PaginationService', ['orderBy']);
    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [ItemManagerComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ItemService, useValue: spyItemService },
        { provide: SortService, useValue: spySortService },
        { provide: FilterService, useValue: spyFilterService },
        { provide: PaginationService, useValue: spyPaginationService },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useValue: spyRouter }
      ]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(ItemManagerComponent);
    router = TestBed.get(Router);
    activatedRoute = TestBed.get(ActivatedRoute);
    itemService = TestBed.get(ItemService);
    filterService = TestBed.get(FilterService);
    paginationService = TestBed.get(PaginationService);
    sortService = TestBed.get(SortService);
    component = fixture.componentInstance;
  });

  it('should dispatch actions when request success', () => {
    itemService.getItems.and.returnValue(of([]));
    const initItems = spyOn(component, 'initItems');
    const updatePages = spyOn(component, 'updatePages');
    const getSortFromParams = spyOn(component, 'getSortFromParams');
    fixture.detectChanges();
    expect(component.errorMsg).toBeNull();
    expect(initItems).toHaveBeenCalled();
    expect(updatePages).toHaveBeenCalled();
    expect(getSortFromParams).toHaveBeenCalled();
  });

  it('should set errorMsg when request fail', () => {
    itemService.getItems.and.returnValue(throwError('error'));
    fixture.detectChanges();
    expect(component.errorMsg).toBeTruthy('Ha ocorrido un error, por favor vuelva a intentarlo');
    expect(component.isLoading$.getValue()).toBeFalsy();
  });

  it('should set filters when filter params exists', () => {
    spyOn(component, 'updatePages');
    const mockFilters = [{ text: 'Pola', type: typeEnum.title }];
    const mockFilteredItems = [];
    filterService.getFilteredDate.and.returnValue(mockFilteredItems);
    activatedRoute.testQueryParamMap = { filter: JSON.stringify(mockFilters) };
    component.initItems();
    expect(component.filters).toEqual(mockFilters);
    expect(component.filteredItems).toEqual(mockFilteredItems);
  });

  it('should not set filters when filter params exists', () => {
    spyOn(component, 'updatePages');
    component.items = [
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
    ];

    const mockFilteredItems = [];
    filterService.getFilteredDate.and.returnValue(mockFilteredItems);
    activatedRoute.testQueryParamMap = {};
    component.initItems();
    expect(component.filters).toBeFalsy();
    expect(component.filteredItems).toEqual(component.items);
  });

  it('should not set filters when filter params is empty', () => {
    spyOn(component, 'updatePages');
    component.items = [
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

    const mockFilters = [];
    const mockFilteredItems = [];
    filterService.getFilteredDate.and.returnValue(mockFilteredItems);
    activatedRoute.testQueryParamMap = { filter: JSON.stringify(mockFilters) };
    component.initItems();
    expect(component.filters).toEqual([]);
    expect(component.filteredItems).toEqual(component.items);
  });

  it('should update filters when filters is not empty', () => {
    spyOn(component, 'updatePages');
    const mockFilters = [{ text: 'Pola', type: typeEnum.title }];
    const mockFilteredItems = [];
    filterService.getFilteredDate.and.returnValue(mockFilteredItems);
    component.onUpdateFilters(mockFilters);
    expect(component.filteredItems).toEqual(mockFilteredItems);
    expect(router.navigate).toHaveBeenCalled();
    expect(component.updatePages).toHaveBeenCalled();
    expect(router.navigate.calls.mostRecent().args[1].queryParams).toEqual({ filter: JSON.stringify(mockFilters) });
  });

  it('should update filters is empty', () => {
    spyOn(component, 'updatePages');
    const mockFilters = [];
    component.items = [
      {
        title: 'iPhone 6S Oro',
        description: 'Vendo un iPhone 6 S color Oro nuevo y sin estrenar.',
        price: '740',
        email: 'iphonemail@wallapop.com',
        image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/iphone.png'
      }
    ];
    component.onUpdateFilters(mockFilters);
    expect(filterService.getFilteredDate).not.toHaveBeenCalled();
    expect(component.filteredItems).toEqual(component.items);
    expect(component.updatePages).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
    expect(router.navigate.calls.mostRecent().args[1].queryParams).toEqual({ filter: null });
  });

  it('should update pages', () => {
    const mockItemsFiltered = {
      0: [{
        title: 'iPhone 6S Oro',
        description: 'Vendo un iPhone 6 S color Oro nuevo y sin estrenar.',
        price: '740',
        email: 'iphonemail@wallapop.com',
        image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/iphone.png'
      }]
    };
    paginationService.getItemsbyPage.and.returnValue(mockItemsFiltered);
    component.updatePages();
    expect(paginationService.getItemsbyPage).toHaveBeenCalled();
    expect(component.itemsPage).toEqual(mockItemsFiltered);
    expect(component.currentPage).toEqual(1);
    expect(component.pages).toEqual(Object.keys(mockItemsFiltered).length);
  });

  it('should sort pages', () => {
    spyOn(component, 'setPages');
    const sort = {
      keySelected: 'title',
      direction: sortDirecction.DESC
    }
    const mockItemsSorted = [
      {
        title: 'iPhone 6S Oro',
        description: 'Vendo un iPhone 6 S color Oro nuevo y sin estrenar.',
        price: '740',
        email: 'iphonemail@wallapop.com',
        image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/iphone.png'
      }
    ];
    sortService.orderBy.and.returnValue(mockItemsSorted);
    component.onSortChanged(sort);
    expect(component.setPages).toHaveBeenCalled();
    expect(sortService.orderBy).toHaveBeenCalled();
    expect(router.navigate.calls.mostRecent().args[1].queryParams).toEqual(sort);
  });

  it('should get favorites', () => {
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
        fav: false
      }
    ]
    component.items = mockItems;
    expect(component.getFavoriteItems()).toEqual([mockItems[0]]);
    expect(component.getFavoritesAmount()).toEqual(1);
  });

  it('should change page', () => {
    component.currentPage = 1;
    component.onChangePage(2);
    expect(component.currentPage).toEqual(2);
  });

  it('should open modal', () => {
    component.openFavoriteModal = false;
    component.onShowFavoriteModal(true);
    expect(component.openFavoriteModal).toEqual(true);
  });

  it('should get favorites', () => {
    const mockItems = [
      {
        title: 'iPhone 6S Oro',
        description: 'Vendo un iPhone 6 S color Oro nuevo y sin estrenar.',
        price: '740',
        email: 'iphonemail@wallapop.com',
        image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/iphone.png',
        fav: false
      },
      {
        title: 'Polaroid 635',
        description: 'Cámara clásica de fotos Polaroid, modelo 635.',
        price: '50',
        email: 'cameramail@wallapop.com',
        image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/camera.png',
        fav: false
      }
    ]
    component.items = mockItems;
    component.onToggleFav(mockItems[0]);
    expect(component.items[0].fav).toEqual(true);
    expect(component.items[1].fav).toEqual(false);
  });

  it('should sort by params', () => {
    spyOn(component, 'onSortChanged');
    const sort = {
      keySelected: 'title',
      direction: sortDirecction.DESC
    };

    activatedRoute.testQueryParamMap = sort;

    console.log(activatedRoute.testQueryParamMap);

    component.getSortFromParams();
    expect(component.keySelected).toEqual(sort.keySelected);
    expect(component.direction).toEqual(sort.direction);
    expect(component.onSortChanged).toHaveBeenCalled();
  });

  it('should sort by params', () => {
    spyOn(component, 'onSortChanged');

    activatedRoute.testQueryParamMap = null;

    component.getSortFromParams();
    expect(component.keySelected).toBeFalsy();
    expect(component.direction).toBeFalsy();
    expect(component.onSortChanged).not.toHaveBeenCalled();
  });
});
