import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionProjetComponent } from './description-projet.component';

describe('DescriptionProjetComponent', () => {
  let component: DescriptionProjetComponent;
  let fixture: ComponentFixture<DescriptionProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
