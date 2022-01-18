import { TestBed } from '@angular/core/testing';

import { CreateTempUserService } from './create-temp-user.service';

describe('CreateTempUserService', () => {
  let service: CreateTempUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTempUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
