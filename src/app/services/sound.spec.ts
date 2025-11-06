import { TestBed } from '@angular/core/testing';

import { Sound } from './sound';

describe('Sound', () => {
  let service: Sound;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sound);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
