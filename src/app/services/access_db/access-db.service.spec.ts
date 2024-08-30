import { TestBed } from '@angular/core/testing';

import { AccessDbService } from './access-db.service';

describe('AccessDbService', () => {
  let service: AccessDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
