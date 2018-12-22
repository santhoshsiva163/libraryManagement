import { TestBed } from '@angular/core/testing';

import { CheckAssignedBookService } from './check-assigned-book.service';

describe('CheckAssignedBookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckAssignedBookService = TestBed.get(CheckAssignedBookService);
    expect(service).toBeTruthy();
  });
});
