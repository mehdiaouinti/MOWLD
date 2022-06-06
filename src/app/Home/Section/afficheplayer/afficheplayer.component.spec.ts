import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheplayerComponent } from './afficheplayer.component';

describe('AfficheplayerComponent', () => {
  let component: AfficheplayerComponent;
  let fixture: ComponentFixture<AfficheplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficheplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficheplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
