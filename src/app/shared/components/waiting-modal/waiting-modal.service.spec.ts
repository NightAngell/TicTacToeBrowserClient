import { TestBed } from '@angular/core/testing';

import { WaitingModalService } from './waiting-modal.service';

describe('WaitingModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WaitingModalService = TestBed.get(WaitingModalService);
    expect(service).toBeTruthy();
  });
});
