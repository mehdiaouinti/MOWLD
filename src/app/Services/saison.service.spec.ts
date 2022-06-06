import { TestBed } from '@angular/core/testing';

import { SaisonService } from './saison.service';

describe('SaisonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaisonService = TestBed.get(SaisonService);
    expect(service).toBeTruthy();
  });
});
