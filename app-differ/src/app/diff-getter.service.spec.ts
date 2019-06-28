import { TestBed } from '@angular/core/testing';

import { DiffGetterService } from './diff-getter.service';

describe('DiffGetterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiffGetterService = TestBed.get(DiffGetterService);
    expect(service).toBeTruthy();
  });
});
