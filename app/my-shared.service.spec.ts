import { TestBed } from '@angular/core/testing';

import { MySharedService } from './my-shared.service';

describe('MySharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MySharedService = TestBed.get(MySharedService);
    expect(service).toBeTruthy();
  });
});
