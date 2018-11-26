import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicTacToeSingleplayerComponent } from './tic-tac-toe-singleplayer.component';

describe('TicTacToeSingleplayerComponent', () => {
  let component: TicTacToeSingleplayerComponent;
  let fixture: ComponentFixture<TicTacToeSingleplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicTacToeSingleplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicTacToeSingleplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
