import { TestBed } from '@angular/core/testing';

import { InfoModalService } from './info-modal.service';

describe('InfoModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfoModalService = TestBed.get(InfoModalService);
    expect(service).toBeTruthy();
  });
});
