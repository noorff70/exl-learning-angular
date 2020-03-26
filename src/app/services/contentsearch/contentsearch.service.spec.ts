import { TestBed } from '@angular/core/testing';

import { ContentsearchService } from './contentsearch.service';

describe('ContentsearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentsearchService = TestBed.get(ContentsearchService);
    expect(service).toBeTruthy();
  });
});
