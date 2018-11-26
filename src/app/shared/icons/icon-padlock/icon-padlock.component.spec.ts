import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPadlockComponent } from './icon-padlock.component';

describe('IconPadlockComponent', () => {
  let component: IconPadlockComponent;
  let fixture: ComponentFixture<IconPadlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconPadlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconPadlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
