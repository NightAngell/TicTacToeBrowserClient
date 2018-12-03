import { TestBed } from '@angular/core/testing';

import { WaitingForPlayerModalService } from './waiting-for-player-modal.service';

describe('WaitingForPlayerModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WaitingForPlayerModalService = TestBed.get(WaitingForPlayerModalService);
    expect(service).toBeTruthy();
  });
});
