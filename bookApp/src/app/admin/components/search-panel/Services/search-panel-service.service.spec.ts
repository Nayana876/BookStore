import { TestBed } from '@angular/core/testing';

import { SearchPanelServiceService } from './search-panel-service.service';

describe('SearchPanelServiceService', () => {
  let service: SearchPanelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchPanelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
