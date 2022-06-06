import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardscrollerComponent } from './cardscroller.component';

describe('CardscrollerComponent', () => {
  let component: CardscrollerComponent;
  let fixture: ComponentFixture<CardscrollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardscrollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardscrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
