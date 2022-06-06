import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarleftComponent } from './barleft.component';

describe('BarleftComponent', () => {
  let component: BarleftComponent;
  let fixture: ComponentFixture<BarleftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarleftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarleftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
