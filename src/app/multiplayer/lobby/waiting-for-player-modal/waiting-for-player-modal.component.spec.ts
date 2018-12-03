import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingForPlayerModalComponent } from './waiting-for-player-modal.component';

describe('WaitingForPlayerModalComponent', () => {
  let component: WaitingForPlayerModalComponent;
  let fixture: ComponentFixture<WaitingForPlayerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingForPlayerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingForPlayerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
