import { TestBed } from '@angular/core/testing';

import { BookSubmissionServiceService } from './book-submission-service.service';

describe('BookSubmissionServiceService', () => {
  let service: BookSubmissionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookSubmissionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
