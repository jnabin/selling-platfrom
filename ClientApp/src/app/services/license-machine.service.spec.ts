import { TestBed } from '@angular/core/testing';

import { LicenseMachineService } from './license-machine.service';

describe('LicenseMachineService', () => {
  let service: LicenseMachineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicenseMachineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
