import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichescrollerComponent } from './affichescroller.component';

describe('AffichescrollerComponent', () => {
  let component: AffichescrollerComponent;
  let fixture: ComponentFixture<AffichescrollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffichescrollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffichescrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
