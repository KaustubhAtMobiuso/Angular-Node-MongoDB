/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NewUserServiceService } from './new-user-service.service';

describe('NewUserServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewUserServiceService]
    });
  });

  it('should ...', inject([NewUserServiceService], (service: NewUserServiceService) => {
    expect(service).toBeTruthy();
  }));
});
