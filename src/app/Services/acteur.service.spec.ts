import { TestBed } from '@angular/core/testing';

import { ActeurService } from './acteur.service';

describe('ActeurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActeurService = TestBed.get(ActeurService);
    expect(service).toBeTruthy();
  });
});
